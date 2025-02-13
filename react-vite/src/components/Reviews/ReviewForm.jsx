import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReviewThunk, getReviewsForRestThunk } from '../../redux/reviews';
import './Reviews.css';

const ReviewForm = ({ restaurantId, orderId }) => {
  const [reviewText, setReviewText] = useState('');
  const [orderRating, setOrderRating] = useState(0);
  const [restaurantRating, setRestaurantRating] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // For testing, hardcoding orderId
    const hardcodedOrderId = orderId || 1; // Use this to avoid null value

    if (!hardcodedOrderId) {
      setErrorMessage('Order ID is missing. Please try again.');
      setSuccessMessage(''); // Clear success message
      return;
    }
    if (!reviewText.trim()) {
      setErrorMessage('Please write a review before submitting.');
      setSuccessMessage(''); // Clear success message
      return;
    }
    if (orderRating === 0 || restaurantRating === 0) {
      setErrorMessage('Please select a rating for both order and restaurant.');
      setSuccessMessage(''); // Clear success message
      return;
    }

    const newReview = {
      restaurant_id: restaurantId,
      order_id: hardcodedOrderId,
      review: reviewText,
      order_rating: orderRating,
      restaurant_rating: restaurantRating,
    };

    try {
      const response = await dispatch(createReviewThunk(newReview));
      if (response && !response.errors) {
        setSuccessMessage('Review submitted successfully!');
        setErrorMessage(''); // Clear error message
        setReviewText('');
        setOrderRating(0);
        setRestaurantRating(0);
        dispatch(getReviewsForRestThunk(restaurantId));
      } else {
        setErrorMessage(response.errors || 'Failed to submit review. Please try again.');
        setSuccessMessage(''); // Clear success message
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      setSuccessMessage(''); // Clear success message
    }
  };

  const StarRating = ({ rating, setRating, label }) => (
    <div className="star-rating">
      <label>{label}</label>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? 'star selected' : 'star'}
          onClick={() => setRating(star)}
        >
          ★
        </span>
      ))}
      <span className="rating-value">{rating}</span> {/* Display the numeric rating */}
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Some things to consider: items ordered, flavor, quality, and recommendations..."
        required
      />

      <StarRating
        rating={orderRating}
        setRating={setOrderRating}
        label="Order:"
      />

      <StarRating
        rating={restaurantRating}
        setRating={setRestaurantRating}
        label="Restaurant:"
      />

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
