
//  const GET_MENU_ITEMS = 'GET_MENU_ITEMS';
//  const GET_MENU_ITEM = 'GET_MENU_ITEM';
//  const CREATE_MENU_ITEM = 'CREATE_MENU_ITEM';
//  const UPDATE_MENU_ITEM = 'UPDATE_MENU_ITEM';
//  const DELETE_MENU_ITEM = 'DELETE_MENU_ITEM';
//  const MENU_ERROR = 'MENU_ERROR';

// // Get all menu items
// export const getMenuItems = () => async (dispatch) => {
//   try {
//     const response = await fetch('/api/menu-items');
//     const data = await response.json();
//     dispatch({ type: GET_MENU_ITEMS, payload: data });
//   } catch (error) {
//     dispatch({ type: MENU_ERROR, payload: error });
//   }
// };

// // Get a specific menu item by id
// export const getMenuItem = (id) => async (dispatch) => {
//   try {
//     const response = await fetch(`/api/menu-items/${id}`);
//     const data = await response.json();
//     dispatch({ type: GET_MENU_ITEM, payload: data });
//   } catch (error) {
//     dispatch({ type: MENU_ERROR, payload: error });
//   }
// };

// // Create a new menu item
// export const createMenuItem = (newItem) => async (dispatch) => {
//   try {
//     const response = await fetch('/api/menu-items', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newItem),
//     });
//     const data = await response.json();
//     dispatch({ type: CREATE_MENU_ITEM, payload: data });
//   } catch (error) {
//     dispatch({ type: MENU_ERROR, payload: error });
//   }
// };

// // Update an existing menu item
// export const updateMenuItem = (id, updatedItem) => async (dispatch) => {
//   try {
//     const response = await fetch(`/api/menu-items/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedItem),
//     });
//     const data = await response.json();
//     dispatch({ type: UPDATE_MENU_ITEM, payload: data });
//   } catch (error) {
//     dispatch({ type: MENU_ERROR, payload: error });
//   }
// };

// // Delete a menu item
// export const deleteMenuItem = (id) => async (dispatch) => {
//   try {
//     await fetch(`/api/menu-items/${id}`, {
//       method: 'DELETE',
//     });
//     dispatch({ type: DELETE_MENU_ITEM, payload: id });
//   } catch (error) {
//     dispatch({ type: MENU_ERROR, payload: error });
//   }
// };



// // ------------------- 

// // src/redux/menuReducer.js
  
//   const menuReducer = (state = initialState, action) => {
// 	switch (action.type) {
// 	  case GET_MENU_ITEMS:
// 		return { ...state, menuItems: action.payload };
// 	  case GET_MENU_ITEM:
// 		return { ...state, menuItem: action.payload };
// 	  case CREATE_MENU_ITEM:
// 		return { ...state, menuItems: [...state.menuItems, action.payload] };
// 	  case UPDATE_MENU_ITEM:
// 		return {
// 		  ...state,
// 		  menuItems: state.menuItems.map((item) =>
// 			item.id === action.payload.id ? action.payload : item
// 		  ),
// 		};
// 	  case DELETE_MENU_ITEM:
// 		return {
// 		  ...state,
// 		  menuItems: state.menuItems.filter((item) => item.id !== action.payload),
// 		};
// 	  case MENU_ERROR:
// 		return { ...state, error: action.payload };
// 	  default:
// 		return state;
// 	}
//   };
  
//   export default menuReducer;

  