import { useDispatch } from 'react-redux';
import { deleteReviewThunk } from '../../redux/reviews';
import './Reviews.css';

const ReviewItem = ({ review }) => {
  const dispatch = useDispatch();

  // Helper function to convert rating to stars
  const getStarRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const handleDelete = () => {
    dispatch(deleteReviewThunk(review.id));
  };

  return (
    <div className="review-item">
      <p>{review.review}</p>
      <div className="rating-container">
        <div className="rating-item">
          <span>Order {getStarRating(review.order_rating)}</span>
        </div>
        <div className="rating-item">
          <span>Restaurant {getStarRating(review.restaurant_rating)}</span>
        </div>
      </div>
      <div className="review-actions">
        <button onClick={handleDelete}>Delete</button>
        <button>Update</button>
      </div>
    </div>
  );
};

export default ReviewItem;