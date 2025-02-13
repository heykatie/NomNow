import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { getReviewsForRestThunk } from '../../redux/reviews';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import './Reviews.css';

const Reviews = () => {
  const { restaurantId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');
  const restaurantName = queryParams.get('restaurantName');

  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.allReviewsForRest);

  useEffect(() => {
    if (restaurantId) {
      console.log('Fetching reviews for restaurant:', restaurantId);
      dispatch(getReviewsForRestThunk(restaurantId));
    }
  }, [dispatch, restaurantId]);

  console.log('Reviews in Reviews component:', reviews); // Logging to check data
  console.log('Order ID:', orderId); // Check if orderId is being received

  return (
    <div className="reviews-container">
      <h2>Reviews for {restaurantName || `Restaurant ${restaurantId}`}</h2>
      <ReviewForm restaurantId={restaurantId} orderId={orderId || 1} /> {/* Pass orderId to the form */}
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default Reviews;
