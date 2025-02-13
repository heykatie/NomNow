import { csrfFetch } from './csrf';
import { setError } from './errors';

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
