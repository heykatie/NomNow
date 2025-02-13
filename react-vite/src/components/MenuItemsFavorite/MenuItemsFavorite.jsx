import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // To access Redux state
import { getFavoriteItems } from '../../redux/menuItems';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const dispatch = useDispatch();
  const menuItems = useSelector(state => state.menuItems.menuItems);
  const favoriteItems = useSelector(state => state.menuItems.favoriteItems); // Get favorite items from Redux store

  useEffect(() => {
    dispatch(getFavoriteItems()); // Dispatch action to fetch favorite items
  }, [dispatch]);

  if (!favoriteItems.length) {
    return <h2>No favorite items yet!</h2>;
  }

  return (
    <div>
      <h2>Your Favorites</h2>
      <ul>
        {favoriteItems.map(item => (
          <li key={item.id} style={{ marginBottom: '20px' }}>
            <Link to={`/menu-items/${item.id}`}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <img src={item.food_image} alt={item.name} style={{ width: '100px', height: '100px' }} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
