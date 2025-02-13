import { csrfFetch } from './csrf';
import { setError } from './errors';

const LOAD_USER_ORDERS = 'orders/loadUserOrders';
const LOAD_USER_ORDER = 'orders/loadUserOrder';
const LOAD_USER_ORDERS_4_REST = 'orders/loadUserOrders4Rest';

const ADD_ORDER = 'orders/addOrder';
const UPDATE_ORDER = 'orders/updateOrder';
const SUBMIT_ORDER = 'orders/submitOrder';
const REMOVE_ORDER = 'orders/removeOrder';


const loadUserOrders = (orders) => ({
	type: LOAD_USER_ORDERS,
	payload: orders,
});
const loadUserOrder = (order) => ({ type: LOAD_USER_ORDER, payload: order });
const loadUserOrders4Rest = (orders) => ({
	type: LOAD_USER_ORDERS_4_REST,
	payload: orders,
});
const addOrder = (order) => ({ type: ADD_ORDER, payload: order });
const updateOrder = (order) => ({ type: UPDATE_ORDER, payload: order });
const submitOrder = (order) => ({ type: SUBMIT_ORDER, payload: order });
const removeOrder = (orderId) => ({ type: REMOVE_ORDER, payload: orderId });


export const getUserOrders = () => async (dispatch) => {
	try {
		const response = await csrfFetch('/api/orders/');
		if (!response.ok) throw response;

		const data = await response.json();
		dispatch(loadUserOrders(data.orders));
	} catch (error) {
		const errorMessage = await error.json();
		dispatch(setError(errorMessage.errors));
	}
};

export const getUserOrder = (orderId) => async (dispatch) => {
	try {
		const response = await csrfFetch(`/api/orders/${orderId}`);
		if (!response.ok) throw response;

		const data = await response.json();
		dispatch(loadUserOrder(data));
	} catch (error) {
		const errorMessage = await error.json();
		dispatch(setError(errorMessage));
	}
};

export const getUserOrders4Rest = (restaurantId) => async (dispatch) => {
	try {
		const response = await csrfFetch(
			`/api/orders/restaurant/${restaurantId}`
		);
		if (!response.ok) throw response;

		const data = await response.json();
		dispatch(loadUserOrders4Rest(data.orders));
	} catch (error) {
		const errorMessage = await error.json();
		dispatch(setError(errorMessage));
	}
};

export const createOrder = (orderData) => async (dispatch) => {
	try {
		const response = await csrfFetch('/api/orders/', {
			method: 'POST',
			body: JSON.stringify({
				...orderData,
				status: 'Active', // Ensure the order is marked as "Active"
			}),
		});
		if (!response.ok) throw response;

		const data = await response.json();
		dispatch(addOrder(data));
	} catch (error) {
		const errorMessage = await error.json();
		dispatch(setError(errorMessage));
	}
};

export const editOrder = (orderId, orderData) => async (dispatch) => {
	try {
		const response = await csrfFetch(`/api/orders/${orderId}`, {
			method: 'PUT',
			body: JSON.stringify(orderData),
		});
		if (!response.ok) throw response;

		const data = await response.json();
		dispatch(updateOrder(data));
	} catch (error) {
		const errorMessage = await error.json();
		dispatch(setError(errorMessage));
	}
};

export const placeOrder = (orderId) => async (dispatch) => {
	try {
		const response = await csrfFetch(`/api/orders/${orderId}/submit`, {
			method: 'PUT',
		});
		if (!response.ok) throw response;

		const data = await response.json();
		dispatch(submitOrder(data));
	} catch (error) {
		const errorMessage = await error.json();
		dispatch(setError(errorMessage));
	}
};

export const deleteOrder = (orderId) => async (dispatch) => {
	try {
		const response = await csrfFetch(`/api/orders/${orderId}`, {
			method: 'DELETE',
		});
		if (!response.ok) throw response;

		dispatch(removeOrder(orderId));
	} catch (error) {
		const errorMessage = await error.json();
		dispatch(setError(errorMessage));
	}
};


const initialState = {
	userOrders: [],
	currentOrder: JSON.parse(localStorage.getItem('currentOrder')) || null,
	userOrdersForRestaurant: [],
};

export default function ordersReducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_USER_ORDERS:
			return { ...state, userOrders: action.payload };
		case LOAD_USER_ORDER:
			localStorage.setItem('currentOrder', JSON.stringify(action.payload)); // Save order
			return { ...state, currentOrder: action.payload };
		case LOAD_USER_ORDERS_4_REST:
			return { ...state, userOrdersForRestaurant: action.payload };
		case ADD_ORDER:
			return { ...state, userOrders: [...state.userOrders, action.payload] };
		case UPDATE_ORDER:
			return {
				...state,
				userOrders: state.userOrders.map((order) =>
					order.id === action.payload.id ? action.payload : order
				),
			};
		case SUBMIT_ORDER:
			return {
				...state,
				userOrders: state.userOrders.map((order) =>
					order.id === action.payload.id
						? { ...order, status: 'Submitted' }
						: order
				),
			};
		case REMOVE_ORDER:
			localStorage.removeItem('currentOrder'); // Clear saved order
			return {
				...state,
				userOrders: state.userOrders.filter(
					(order) => order.id !== action.payload
				),
				currentOrder: null,
			};
		default:
			return state;
	}
}
