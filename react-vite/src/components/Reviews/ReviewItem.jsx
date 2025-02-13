import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReviewThunk, updateReviewThunk } from '../../redux/reviews';
import './Reviews.css';

const ReviewItem = ({ review }) => {
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.session.user?.id);

  const [isEditing, setIsEditing] = useState(false);
  const [updatedReviewText, setUpdatedReviewText] = useState(review.review);
  const [updatedOrderRating, setUpdatedOrderRating] = useState(review.order_rating);
  const [updatedRestaurantRating, setUpdatedRestaurantRating] = useState(review.restaurant_rating);


  const handleSave = () => {
    const updatedReview = {
      id: review.id,
      review: updatedReviewText,
      order_rating: updatedOrderRating,
      restaurant_rating: updatedRestaurantRating,
    };

    dispatch(updateReviewThunk(updatedReview)).then(() => {
      setIsEditing(false);  
    });
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
              <span>Order ★ {review.order_rating}</span>
            </div>
            <div className="rating-item">
              <span>Restaurant ★ {review.restaurant_rating}</span>
            </div>
          </div>
          {review.userId === loggedInUserId && (
            <div className="review-actions">
              <button onClick={() => dispatch(deleteReviewThunk(review.id))}>Delete</button>
              <button onClick={() => setIsEditing(true)}>Update</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewItem;