import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; 
import { getReviewsForRestThunk } from '../../redux/reviews';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';

const Reviews = () => {
  const { restaurantId } = useParams();  
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.allReviewsForRest);

  useEffect(() => {
    if (restaurantId) {
      dispatch(getReviewsForRestThunk(restaurantId)); 
    }
  }, [dispatch, restaurantId]);

  return (
    <div className="reviews-container">
      <ReviewForm restaurantId={restaurantId} /> {/* Pass restaurantId as prop */}
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default Reviews;
