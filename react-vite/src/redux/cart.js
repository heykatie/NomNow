import { csrfFetch } from './csrf';
import { setError } from './errors';
import { createOrder } from './orders';

// Action Types
const ADD_TO_CART = 'cart/addToCart';
const REMOVE_FROM_CART = 'cart/removeFromCart';
const CLEAR_CART = 'cart/clearCart';

// Action Creators

const addCartItem = (item) => ({
	type: ADD_TO_CART,
	payload: item,
});

const removeCartItem = (itemId) => ({
	type: REMOVE_FROM_CART,
	payload: itemId,
});

const clearCartItems = () => ({
	type: CLEAR_CART,
});

// Thunks

export const getCart = (state) => state.cart.cartItems;

export const addToCart =
	(menuItemId, quantity = 1) =>
	async (dispatch) => {
		try {
			const response = await csrfFetch('/api/cart', {
				method: 'POST',
				body: JSON.stringify({ menu_item_id: menuItemId, quantity }),
			});
			if (!response.ok) throw response;

			const data = await response.json();
			dispatch(addCartItem(data));
		} catch (error) {
			const errorMessage = await error.json();
			dispatch(setError(errorMessage.errors));
		}
	};

export const removeFromCart = (menuItemId) => async (dispatch) => {
	try {
		const response = await csrfFetch(`/api/cart/${menuItemId}`, {
			method: 'DELETE',
		});
		if (!response.ok) throw response;

		dispatch(removeCartItem(menuItemId));
	} catch (error) {
		const errorMessage = await error.json();
		dispatch(setError(errorMessage.errors));
	}
};


export const checkoutCart = () => async (dispatch, getState) => {
	const state = getState();
	const cartItems = state.cart.cartItems;

	if (cartItems.length === 0) {
		console.warn('Cart is empty, cannot proceed to checkout.');
		return;
	}

	const restaurantId = cartItems[0]?.restaurant_id;
	const items = cartItems.map((item) => ({
		menu_item_id: item.id,
		quantity: item.quantity,
	}));

	await dispatch(createOrder({ restaurant_id: restaurantId, items }));

	dispatch(clearCart());
};

export const clearCart = () => async (dispatch) => {
	try {
		const response = await csrfFetch('/api/cart/clear', {
			method: 'DELETE',
		});
		if (!response.ok) throw response;

		dispatch(clearCartItems());
	} catch (error) {
		const errorMessage = await error.json();
		dispatch(setError(errorMessage.errors));
	}
};

// Initial State
const initialState = {
	cartItems: [],
};

// Reducer
export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_TO_CART:
			return { ...state, cartItems: [...state.cartItems, action.payload] };
		case REMOVE_FROM_CART:
			return {
				...state,
				cartItems: state.cartItems.filter(
					(item) => item.id !== action.payload
				),
			};
		case CLEAR_CART:
			return { ...state, cartItems: [] };
		default:
			return state;
	}
}
