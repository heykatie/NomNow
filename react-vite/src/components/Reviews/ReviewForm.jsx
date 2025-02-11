import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReviewThunk } from '../../redux/reviews';

const ReviewForm = ({ restaurantId }) => {
  const [reviewText, setReviewText] = useState('');
  const [orderRating, setOrderRating] = useState(1);
  const [restaurantRating, setRestaurantRating] = useState(1);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      restaurant_id: restaurantId, 
      order_id: 1, 
      reviewText,
      order_rating: orderRating,
      restaurant_rating: restaurantRating,
    };
    dispatch(createReviewThunk(newReview));
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review here"
      />
      <input
        type="number"
        value={orderRating}
        onChange={(e) => setOrderRating(e.target.value)}
        min="1"
        max="5"
      />
      <input
        type="number"
        value={restaurantRating}
        onChange={(e) => setRestaurantRating(e.target.value)}
        min="1"
        max="5"
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;