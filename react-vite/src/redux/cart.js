import { setError } from './errors';
import { createOrder } from './orders';

const ADD_TO_CART = 'cart/addToCart';
const REMOVE_FROM_CART = 'cart/removeFromCart';
const UPDATE_CART_ITEM = 'cart/updateCartItem';
const CLEAR_CART = 'cart/clearCart';
const CART_STORAGE_KEY = 'cartItems';

const loadCartFromStorage = () => {
	const storedCart = localStorage.getItem(CART_STORAGE_KEY);
	return storedCart ? JSON.parse(storedCart) : [];
};

const addCartItem = (item) => ({
	type: ADD_TO_CART,
	payload: item,
});

const removeCartItem = (itemId) => ({
	type: REMOVE_FROM_CART,
	payload: itemId,
});

const updateCartItem = (itemId, quantity) => ({
	type: UPDATE_CART_ITEM,
	payload: { itemId, quantity },
});

const saveCartToStorage = (cartItems) => {
	localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
};

const clearCartItems = () => ({
	type: CLEAR_CART,
});

export const getCart = (state) => state.cart?.cartItems || [];

export const addToCart =
	(menuItem, quantity = 1) =>
	(dispatch, getState) => {
		const state = getState();
		const existingItem = state.cart.cartItems.find(
			(item) => item.id === menuItem.id
		);

		if (existingItem) {
			dispatch(
				updateItemQuantity(menuItem.id, existingItem.quantity + quantity)
			);
		} else {
			dispatch(addCartItem({ ...menuItem, quantity }));
		}
	};

export const removeFromCart = (menuItemId) => (dispatch) => {
	dispatch(removeCartItem(menuItemId));
};

export const updateItemQuantity =
	(menuItemId, quantity) => (dispatch, getState) => {
		const state = getState();
		const existingItem = state.cart.cartItems.find(
			(item) => item.id === menuItemId
		);

		if (existingItem) {
			dispatch(updateCartItem(menuItemId, quantity));
		}
	};

export const checkoutCart = () => (dispatch, getState) => {
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

	dispatch(createOrder({ restaurant_id: restaurantId, items }));
	// dispatch(clearCartItems()); // Clear cart after checkout
};

export const clearCart = () => (dispatch) => {
	dispatch(clearCartItems());
};


const initialState = {
	cartItems: loadCartFromStorage() || [],
};

export default function cartReducer(state = initialState, action) {
	let updatedCart;
	switch (action.type) {
		case ADD_TO_CART:
			updatedCart = [...state.cartItems, action.payload];
			saveCartToStorage(updatedCart);
			return { ...state, cartItems: updatedCart };

		case REMOVE_FROM_CART:
			updatedCart = state.cartItems.filter(
				(item) => item.id !== action.payload
			);
			saveCartToStorage(updatedCart);
			return { ...state, cartItems: updatedCart };

		case UPDATE_CART_ITEM:
			updatedCart = state.cartItems.map((item) =>
				item.id === action.payload.itemId
					? { ...item, quantity: action.payload.quantity }
					: item
			);
			saveCartToStorage(updatedCart);
			return { ...state, cartItems: updatedCart };

		case CLEAR_CART:
			saveCartToStorage([]);
			return { ...state, cartItems: [] };

		default:
			return state;
	}
}