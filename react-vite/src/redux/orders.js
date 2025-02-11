import { csrfFetch } from './csrf';

const LOAD_USER_ORDERS = 'orders/loadUserOrders';
const LOAD_USER_ORDER = 'orders/loadUserOrder';
const LOAD_USER_ORDERS_4_REST = 'orders/loadUserOrders4Rest';

const ADD_ORDER = 'orders/addOrder';
const EDIT_ORDER = 'orders/editOrder';
const SUBMIT_ORDER = 'orders/submitOrder';
const REMOVE_ORDER = 'orders/removeOrder';


const loadUserOrders = (orders) => ({
	type: LOAD_USER_ORDERS,
	payload: orders,
});

const loadUserOrder = (order) => ({
	type: LOAD_USER_ORDER,
	payload: order,
});

const loadUserOrders4Rest = (orders) => ({
	type: LOAD_USER_ORDERS_4_REST,
	payload: orders,
});

const addOrder = (order) => ({
	type: ADD_ORDER,
	payload: order,
});

const editOrder = (order) => ({
	type: EDIT_ORDER,
	payload: order,
});

const submitOrder = (order) => ({
	type: SUBMIT_ORDER,
	payload: order,
});

const removeOrder = (orderId) => ({
	type: REMOVE_ORDER,
	payload: orderId,
});


// Fetch all orders for the logged-in user
export const getUserOrders = () => async (dispatch) => {
	const response = await csrfFetch('/api/orders/');
	if (response.ok) {
		const data = await response.json();
		dispatch(loadUserOrders(data.orders));
	}
};

// Fetch a single order by ID
export const getUserOrder = (orderId) => async (dispatch) => {
	const response = await csrfFetch(`/api/orders/${orderId}`);
	if (response.ok) {
		const data = await response.json();
		dispatch(loadUserOrder(data));
	}
};

// Fetch all orders for a restaurant made by current user
export const getUserOrders4Rest = (restaurantId) => async (dispatch) => {
	const response = await csrfFetch(`/api/orders/restaurant/${restaurantId}`);
	if (response.ok) {
		const data = await response.json();
		dispatch(loadUserOrders4Rest(data.orders));
	}
};

// Create a new order
export const addToCart = (orderData) => async (dispatch) => {
	const response = await csrfFetch('/api/orders/', {
		method: 'POST',
		body: JSON.stringify(orderData),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(addOrder(data));
	}
};

// Edit an existing order (modifying items)
export const editCart = (orderId, orderData) => async (dispatch) => {
	const response = await csrfFetch(`/api/orders/${orderId}`, {
		method: 'PUT',
		body: JSON.stringify(orderData),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(editOrder(data));
	}
};

// Submit an order (finalize)
export const checkoutCart = (orderId) => async (dispatch) => {
	const response = await csrfFetch(`/api/orders/${orderId}/submit`, {
		method: 'PUT',
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(submitOrder(data));
	}
};

// Delete an order
export const trashCart = (orderId) => async (dispatch) => {
	const response = await csrfFetch(`/api/orders/${orderId}`, {
		method: 'DELETE',
	});

	if (response.ok) {
		dispatch(removeOrder(orderId));
	}
};


const initialState = {
	userOrders: [],
	currentOrder: null,
	userOrdersForRestaurant: [],
};

export default function ordersReducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_USER_ORDERS:
			return { ...state, userOrders: action.payload };
		case LOAD_USER_ORDER:
			return { ...state, currentOrder: action.payload };
      case LOAD_USER_ORDERS_4_REST:
        return { ...state, userOrdersForRestaurant: action.payload };
        case ADD_ORDER:
          return { ...state, userOrders: [...state.userOrders, action.payload] };
          case EDIT_ORDER:
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
        return {
          ...state,
          userOrders: state.userOrders.filter(
            (order) => order.id !== action.payload
          ),
        };
        default:
          return state;
        }
      }


      
      // case LOAD_USER_ORDER:
      // 	return {
      // 		...state,
      // 		currentOrder: action.payload,
      // 		userOrders: state.userOrders.some(
      // 			(order) => order.id === action.payload.id
      // 		)
      // 			? state.userOrders
      // 			: [...state.userOrders, action.payload], // Store if not already in list
      // 	};