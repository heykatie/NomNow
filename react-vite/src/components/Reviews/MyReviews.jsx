import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserReviewsThunk, deleteReviewThunk } from '../../redux/reviews';
import './MyReviews.css';
import React, { useEffect, useState } from 'react';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [restaurantNames, setRestaurantNames] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate to other routes

  useEffect(() => {
    const fetchReviewsAndRestaurants = async () => {
      try {
        // Fetch reviews
        const response = await fetch('/api/reviews/user', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data = await response.json();
        setReviews(data.data);

        // Fetch restaurant names
        const names = {};
        await Promise.all(
          data.data.map(async (review) => {
            if (!names[review.restaurant_id]) {
              try {
                const restaurantResponse = await fetch(`/api/restaurants/${review.restaurant_id}`);
                if (!restaurantResponse.ok) throw new Error('Failed to fetch restaurant name');
                const restaurantData = await restaurantResponse.json();
                names[review.restaurant_id] = restaurantData.name;
              } catch (err) {
                console.error(`Error fetching restaurant name for ID ${review.restaurant_id}:`, err);
                names[review.restaurant_id] = 'Unknown Restaurant';
              }
            }
          })
        );
        setRestaurantNames(names);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewsAndRestaurants();
  }, []);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error: {error}</div>;
  if (reviews.length === 0) return <div>No reviews found.</div>;

  return (
    <div className="my-reviews-container">
      <h1>My Reviews</h1>
      <h3 className="small-heading">Click See More to view, update, or delete your review from the restaurant</h3>
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <p>{review.review}</p>
            {/* Add the 'See More' link */}
            <button
              className="review-buttons"
              onClick={() => navigate(`/reviews/restaurant/${review.restaurant_id}`)} // Navigate to restaurant's reviews page
            >
              See More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
