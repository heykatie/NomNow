import { useDispatch } from 'react-redux';
import { deleteReviewThunk } from '../../redux/reviews';

const ReviewItem = ({ review }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteReviewThunk(review.id));
  };

  return (
    <div className="review-item">
      <p>{review.review}</p>
      <div>
        <span>Order Rating: {review.order_rating}</span>
        <span>Restaurant Rating: {review.restaurant_rating}</span>
      </div>
      <button onClick={handleDelete}>Delete</button>
      <button>Update</button>
    </div>
  );
};

export default ReviewItem;
