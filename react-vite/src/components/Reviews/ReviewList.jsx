import { useSelector } from 'react-redux';
import ReviewItem from './ReviewItem';
import './Reviews.css';

const ReviewList = () => {
  const reviews = useSelector((state) => state.reviews.allReviewsForRest);

  console.log('Reviews in ReviewList:', reviews); // Logging to check data

  if (!reviews || reviews.length === 0) {
    return <p>No reviews yet!</p>;
  }

  return (
    <div className="review-list">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
