import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReviewThunk, updateReviewThunk } from '../../redux/reviews';
import './Reviews.css';

const ReviewItem = ({ review }) => {
  const dispatch = useDispatch();
  const loggedInUserId = useSelector(state => state.session.user?.id);

  const [isEditing, setIsEditing] = useState(false);
  const [updatedReviewText, setUpdatedReviewText] = useState(review.review);
  const [updatedOrderRating, setUpdatedOrderRating] = useState(review.orderRating); // Updated key
  const [updatedRestaurantRating, setUpdatedRestaurantRating] = useState(review.restaurantRating); // Updated key

  const handleDelete = () => {
    dispatch(deleteReviewThunk(review.id));
  };

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedReview = {
      id: review.id,
      review: updatedReviewText,
      orderRating: updatedOrderRating, // Updated key
      restaurantRating: updatedRestaurantRating, // Updated key
    };

    dispatch(updateReviewThunk(updatedReview));
    setIsEditing(false);
  };

  const getStarRating = (rating) => {
    rating = Math.min(Math.max(rating, 1), 5);
    return (
      <div className="star-rating-display">
        {[1, 2, 3, 4, 5].map(star => (
          <span key={star} className={star <= rating ? 'star selected' : 'star'}>
            ★
          </span>
        ))}
        <span className="rating-number">({rating})</span>
      </div>
    );
  };

  return (
    <div className="review-item">
      {isEditing ? (
        <div>
          <textarea
            value={updatedReviewText}
            onChange={(e) => setUpdatedReviewText(e.target.value)}
          />
          <input
            type="number"
            value={updatedOrderRating}
            onChange={(e) => setUpdatedOrderRating(Number(e.target.value))}
            min="1"
            max="5"
          />
          <input
            type="number"
            value={updatedRestaurantRating}
            onChange={(e) => setUpdatedRestaurantRating(Number(e.target.value))}
            min="1"
            max="5"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{review.review}</p>
          <div className="rating-container">
            <div className="rating-item">
              <span>Order {getStarRating(review.orderRating)}</span> {/* Updated key */}
            </div>
            <div className="rating-item">
              <span>Restaurant {getStarRating(review.restaurantRating)}</span> {/* Updated key */}
            </div>
          </div>
          {review.userId === loggedInUserId && ( // Only show delete and update buttons if the review belongs to the logged-in user
            <div className="review-actions">
              <button onClick={handleDelete}>Delete</button>
              <button onClick={handleUpdate}>Update</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewItem;