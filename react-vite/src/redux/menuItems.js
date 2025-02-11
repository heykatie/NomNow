// ACTION TYPES
const GET_MENU_ITEMS = 'GET_MENU_ITEMS';
const GET_MENU_ITEM = 'GET_MENU_ITEM';
const CREATE_MENU_ITEM = 'CREATE_MENU_ITEM';
const UPDATE_MENU_ITEM = 'UPDATE_MENU_ITEM';
const DELETE_MENU_ITEM = 'DELETE_MENU_ITEM';
const MENU_ERROR = 'MENU_ERROR';

// INITIAL STATE
const initialState = {
  menuItems: [],
  menuItem: null,
  error: null,
};

// THUNKS
// Get all menu items
export const getMenuItems = () => async (dispatch) => {
  try {
    const response = await fetch('/api/menu-items');
    const data = await response.json();
    // console.log("Fetched Menu Items:", data); // Debugging log

    dispatch({ type: GET_MENU_ITEMS, payload: data });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    dispatch({ type: MENU_ERROR, payload: error });
  }
};

// Get a specific menu item by id
export const getMenuItem = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/menu-items/${id}`);
    const data = await response.json();
    dispatch({ type: GET_MENU_ITEM, payload: data });
  } catch (error) {
    console.error('Error fetching menu item:', error);
    dispatch({ type: MENU_ERROR, payload: error });
  }
};

// Create a new menu item
export const createMenuItem = (newItem) => async (dispatch) => {
  try {
    const response = await fetch('/api/menu-items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });
    const data = await response.json();

    if (response.ok) {
      // Add the new item at the front of the list
      dispatch({ type: CREATE_MENU_ITEM, payload: data });
    } else {
      throw new Error(data.error || 'Failed to create menu item');
    }
  } catch (error) {
    console.error('Error creating menu item:', error);
    dispatch({ type: MENU_ERROR, payload: error.message });
  }
};

// Update an existing menu item
export const updateMenuItem = (id, updatedItem) => async (dispatch) => {
  try {
    const response = await fetch(`/api/menu-items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    });
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: UPDATE_MENU_ITEM, payload: data });
    } else {
      throw new Error(data.error || 'Failed to update menu item');
    }
  } catch (error) {
    console.error('Error updating menu item:', error);
    dispatch({ type: MENU_ERROR, payload: error.message });
  }
};

// Delete a menu item
export const deleteMenuItem = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/menu-items/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch({ type: DELETE_MENU_ITEM, payload: id });
    } else {
      const data = await response.json();
      throw new Error(data.error || 'Failed to delete menu item');
    }
  } catch (error) {
    console.error('Error deleting menu item:', error);
    dispatch({ type: MENU_ERROR, payload: error.message });
  }
};

// REDUCER
const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MENU_ITEMS:
      // console.log("Updating State with Menu Items:", action.payload); // Debugging log
      return { ...state, menuItems: action.payload, error: null };

    case GET_MENU_ITEM:
      return { ...state, menuItem: action.payload, error: null };

    case CREATE_MENU_ITEM:
      return {
        ...state,
        menuItems: [action.payload, ...state.menuItems], // Add at the front of the list
        error: null,
      };

    case UPDATE_MENU_ITEM:
      return {
        ...state,
        menuItems: state.menuItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        error: null,
      };

    case DELETE_MENU_ITEM:
      return {
        ...state,
        menuItems: state.menuItems.filter((item) => item.id !== action.payload),
        error: null,
      };

    case MENU_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default menuReducer;
