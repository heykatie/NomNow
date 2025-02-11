// ========================== ACTION TYPE CONSTANTS ==========================
const GET_REVIEWS_FOR_REST = 'reviews/getReviewsForRest';
const GET_SINGLE_REVIEW = 'reviews/getSingleReview';
const CREATE_REVIEW = 'reviews/createReview';
const UPDATE_REVIEW = 'reviews/updateReview';
const DELETE_REVIEW = 'reviews/deleteReview';

// ========================== ACTION CREATORS ================================
const getReviewsForRest = (reviews) => ({
  type: GET_REVIEWS_FOR_REST,
  reviews,
});

const getSingleReview = (review) => ({
  type: GET_SINGLE_REVIEW,
  review,
});

const createReview = (review) => ({
  type: CREATE_REVIEW,
  review,
});

const updateReview = (review) => ({
  type: UPDATE_REVIEW,
  review,
});

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

// ========================== THUNKS =====================================

// THUNK: GET ALL REVIEWS FOR A RESTAURANT
export const getReviewsForRestThunk = (restaurantId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/restaurant/${restaurantId}`);
  if (res.ok) {
    const reviews = await res.json();
    dispatch(getReviewsForRest(reviews.data));
  } else {
    const errors = await res.json();
    return errors;
  }
};

// THUNK: GET A SINGLE REVIEW
export const getSingleReviewThunk = (reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`);
  if (res.ok) {
    const review = await res.json();
    dispatch(getSingleReview(review.data));
  } else {
    const errors = await res.json();
    return errors;
  }
};

// THUNK: CREATE A REVIEW
export const createReviewThunk = (review) => async (dispatch) => {
  const { restaurant_id, order_id, reviewText, order_rating, restaurant_rating } = review;

  const res = await fetch(`/api/reviews/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      restaurant_id,
      order_id,
      reviewText, // Use `reviewText` here
      order_rating,
      restaurant_rating,
    }),
  });

  if (res.ok) {
    const newReview = await res.json();
    dispatch(createReview(newReview.data)); // Dispatch the full review object
    return newReview;
  } else {
    const errors = await res.json();
    return errors;
  }
};

// THUNK: UPDATE A REVIEW
export const updateReviewThunk = (review) => async (dispatch) => {
  const { id, reviewText, order_rating, restaurant_rating } = review;

  const res = await fetch(`/api/reviews/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      reviewText, // Use `reviewText` here
      order_rating,
      restaurant_rating,
    }),
  });

  if (res.ok) {
    const updatedReview = await res.json();
    dispatch(updateReview(updatedReview.data));
    return updatedReview;
  } else {
    const errors = await res.json();
    return errors;
  }
};

// THUNK: DELETE A REVIEW
export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(deleteReview(reviewId));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

// ========================== REDUCER =====================================

const initialState = {
  allReviewsForRest: [],
  singleReview: {},
};

export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REVIEWS_FOR_REST: {
      return { ...state, allReviewsForRest: action.reviews };
    }
    case GET_SINGLE_REVIEW: {
      return { ...state, singleReview: action.review };
    }
    case CREATE_REVIEW: {
      return { ...state, allReviewsForRest: [...state.allReviewsForRest, action.review] };
    }
    case UPDATE_REVIEW: {
      return {
        ...state,
        allReviewsForRest: state.allReviewsForRest.map((review) =>
          review.id === action.review.id ? action.review : review
        ),
      };
    }
    case DELETE_REVIEW: {
      return {
        ...state,
        allReviewsForRest: state.allReviewsForRest.filter(
          (review) => review.id !== action.reviewId
        ),
      };
    }
    default:
      return state;
  }
}