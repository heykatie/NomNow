// restaurants.js

// Helper function to calculate average rating
const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return null;
    const totalRating = reviews.reduce((sum, review) => {
        return sum + review.restaurantRating;
    }, 0);
    return (totalRating / reviews.length).toFixed(1);
};

//Restaurant Actions
const GET_RESTAURANTS = 'GET_RESTAURANTS';
const GET_USER_RESTAURANTS = 'GET_USER_RESTAURANTS'
const GET_RESTAURANT = 'GET_RESTAURANT';
const CREATE_RESTAURANT = 'CREATE_RESTAURANT';
const UPDATE_RESTAURANT = 'UPDATE_RESTAURANT';
const DELETE_RESTAURANT = 'DELETE_RESTAURANT';
const RESTAURANT_ERROR = 'RESTAURANT_ERROR';
const REACTIVATE_RESTAURANT = 'REACTIVATE_RESTAURANT';
const SET_RESTAURANT_REVIEWS = 'SET_RESTAURANT_REVIEWS';

//actions/restaurants.js
export const fetchUserRestaurants = () => async (dispatch) => {
    const response = await fetch(`/api/restaurants/current`);
    if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'SET_USER_RESTAURANTS', payload: data.restaurants });
    }
};

// Get all restaurants (owned by current user)
export const getUserRestaurants = () => async (dispatch) => {
    try {
        const response = await fetch('/api/manage/');
        const data = await response.json();
        dispatch({ type: GET_USER_RESTAURANTS, payload: data.restaurants });
    } catch (error) {
        dispatch({ type: RESTAURANT_ERROR, payload: error.message });
    }
};

// Get a specific restaurant by id
export const getRestaurant = (id) => async (dispatch) => {
    try {
        const response = await fetch(`/api/restaurants/${id}`);
        const data = await response.json();
        dispatch({ type: GET_RESTAURANT, payload: data });
        return data;
    } catch (error) {
        dispatch({ type: RESTAURANT_ERROR, payload: error.message });
    }
};

// Get all restaurants with ratings
export const getAllRestaurants = () => async (dispatch) => {
    try {
        // First fetch restaurants
        const restaurantsResponse = await fetch('/api/restaurants/');
        if (!restaurantsResponse.ok) {
            throw new Error('Failed to fetch restaurants');
        }
        const restaurantsData = await restaurantsResponse.json();
        
        // Store to track all reviews
        const allRestaurantReviews = {};

        // Fetch reviews for each restaurant
        await Promise.all(restaurantsData.restaurants.map(async (restaurant) => {
            try {
                const reviewsResponse = await fetch(`/api/reviews/restaurant/${restaurant.id}`);
                if (reviewsResponse.ok) {
                    const reviewsData = await reviewsResponse.json();
                    // Store reviews in our tracking object
                    allRestaurantReviews[restaurant.id] = reviewsData.data || [];
                }
            } catch (error) {
                console.error(`Error fetching reviews for restaurant ${restaurant.id}:`, error);
                allRestaurantReviews[restaurant.id] = [];
            }
        }));

        // First dispatch the reviews
        dispatch({
            type: SET_RESTAURANT_REVIEWS,
            payload: allRestaurantReviews
        });

        // Then dispatch restaurants
        dispatch({
            type: GET_RESTAURANTS,
            payload: restaurantsData.restaurants
        });
    } catch (error) {
        dispatch({ type: RESTAURANT_ERROR, payload: error.message });
    }
};

// Create a new restaurant
export const createRestaurant = (restaurantData) => async (dispatch) => {
    try {
        const response = await fetch('/api/restaurants/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(restaurantData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.errors || 'Failed to create restaurant');
        }

        dispatch({ type: CREATE_RESTAURANT, payload: data.restaurant });
        return data.restaurant;
    } catch (error) {
        console.error('Create restaurant error:', error);
        dispatch({ type: RESTAURANT_ERROR, payload: error.message });
        throw error;
    }
};

// Update an existing restaurant
export const updateRestaurant = (id, restaurantData) => async (dispatch) => {
    try {
        const response = await fetch(`/api/manage/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(restaurantData)
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || data.errors?.[0] || 'Failed to update restaurant');
        }

        const data = await response.json();
        dispatch({ type: UPDATE_RESTAURANT, payload: data.restaurant });
        return data;
    } catch (error) {
        dispatch({ type: RESTAURANT_ERROR, payload: error.message });
        throw error;
    }
};

//Delete restaurant
export const deleteRestaurant = (id, deleteType) => async (dispatch) => {
    try {
        const response = await fetch(`/api/manage/${id}?type=${deleteType}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete restaurant');
        }

        dispatch({ type: DELETE_RESTAURANT, payload: id });
        return true;
    } catch (error) {
        dispatch({ type: RESTAURANT_ERROR, payload: error.message });
        throw error;
    }
};

// Specific action for reactivating a restaurant
export const reactivateRestaurant = (id) => async (dispatch) => {
    try {
        const response = await fetch(`/api/manage/${id}/reactivate`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to reactivate restaurant');
        }

        dispatch({ type: REACTIVATE_RESTAURANT, payload: data });
        return data;
    } catch (error) {
        dispatch({ type: RESTAURANT_ERROR, payload: error.message });
        throw error;
    }
};

// Initial State
const initialState = {
    restaurants: [],
    currentRestaurant: null,
    error: null,
    isLoading: false,
    userRestaurants: [],
    restaurantReviews: {}, // Store reviews by restaurant ID
};

// Reducer
const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RESTAURANT_REVIEWS:
            return {
                ...state,
                restaurantReviews: action.payload
            };

        case GET_RESTAURANTS:
            return {
                ...state,
                restaurants: action.payload.map(restaurant => ({
                    ...restaurant,
                    rating: calculateAverageRating(state.restaurantReviews[restaurant.id]),
                    numReviews: state.restaurantReviews[restaurant.id]?.length || 0
                })),
                error: null
            };

        case GET_USER_RESTAURANTS:
            return {
                ...state,
                restaurants: action.payload,
                error: null
            };

        case GET_RESTAURANT:
            return {
                ...state,
                currentRestaurant: action.payload,
                error: null
            };

        case CREATE_RESTAURANT:
            return {
                ...state,
                restaurants: [...state.restaurants, action.payload],
                error: null
            };

        case REACTIVATE_RESTAURANT:
        case UPDATE_RESTAURANT:
            return {
                ...state,
                restaurants: state.restaurants.map(restaurant =>
                    restaurant.id === action.payload.id ? action.payload : restaurant
                ),
                currentRestaurant: action.payload,
                error: null
            };

        case DELETE_RESTAURANT:
            return {
                ...state,
                restaurants: state.restaurants.filter(restaurant =>
                    restaurant.id !== action.payload
                ),
                error: null
            };

        case RESTAURANT_ERROR:
            return {
                ...state,
                error: action.payload
            };

        case 'SET_USER_RESTAURANTS':
            return { ...state, userRestaurants: action.payload };

        default:
            return state;
    }
};

export default restaurantReducer;