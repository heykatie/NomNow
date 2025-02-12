// react-vite/src/components/Reviews/ReviewList.js

import ReviewItem from './ReviewItem';
import './Reviews.css';

const ReviewList = ({ reviews }) => {
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