import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuItems } from '../../redux/menuItems';  
import { addToCart } from '../../redux/orders'; 
import { Link } from 'react-router-dom';  
import './MenuItemList.css';  

const MenuItemList = () => {
  const dispatch = useDispatch();

  const menuItems = useSelector(state => state.menuItems.menuItems);
  const error = useSelector(state => state.menuItems.error);
  const isLoading = useSelector(state => state.menuItems.isLoading); 
  const user = useSelector(state => state.session?.user || null); // Retrieve user from session state

  const [thumbsUpCounts, setThumbsUpCounts] = useState({});
  const [thumbsStatus, setThumbsStatus] = useState({});  // To track thumbs up/down status

  useEffect(() => {
    dispatch(getMenuItems());

    // Load thumbs-up counts and thumbs status from session storage
    const savedThumbsUpCounts = sessionStorage.getItem('thumbsUpCounts');
    const savedThumbsStatus = sessionStorage.getItem('thumbsStatus');
    
    if (savedThumbsUpCounts) {
      setThumbsUpCounts(JSON.parse(savedThumbsUpCounts));
    }
    if (savedThumbsStatus) {
      setThumbsStatus(JSON.parse(savedThumbsStatus));
    }
  }, [dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const getRestaurantLabel = (restaurantId) => {
    const restaurantMap = {
      1: 'Taco Casa',
      2: 'El Mariachi',
      3: 'Olive Grove',
      4: 'Blue Mediterranean',
      5: 'Thai Orchid',
      6: 'Bangkok Kitchen',
    };
    return restaurantMap[restaurantId] || 'New Restaurant';
  };

  const handleAddToCart = (item) => {
    const orderData = {
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1, // default quantity is 1
    };

    dispatch(addToCart(orderData));
  };

  const handleThumbsUp = (itemId) => {
    if (!thumbsStatus[itemId]) {
      // Increment thumbs up count if user hasn't already clicked
      const updatedThumbsUpCounts = { ...thumbsUpCounts, [itemId]: (thumbsUpCounts[itemId] || 0) + 1 };
      setThumbsUpCounts(updatedThumbsUpCounts);
      setThumbsStatus({ ...thumbsStatus, [itemId]: 'thumbedUp' });

      // Store updated thumbs-up counts and status in sessionStorage
      sessionStorage.setItem('thumbsUpCounts', JSON.stringify(updatedThumbsUpCounts));
      sessionStorage.setItem('thumbsStatus', JSON.stringify({ ...thumbsStatus, [itemId]: 'thumbedUp' }));
    }
  };

  const handleThumbsDown = (itemId) => {
    if (thumbsStatus[itemId] === 'thumbedUp') {
      // Decrement thumbs up count if user had already thumbs up
      const updatedThumbsUpCounts = { ...thumbsUpCounts, [itemId]: (thumbsUpCounts[itemId] || 0) - 1 };
      setThumbsUpCounts(updatedThumbsUpCounts);
      setThumbsStatus({ ...thumbsStatus, [itemId]: 'thumbedDown' });

      // Store updated thumbs-up counts and status in sessionStorage
      sessionStorage.setItem('thumbsUpCounts', JSON.stringify(updatedThumbsUpCounts));
      sessionStorage.setItem('thumbsStatus', JSON.stringify({ ...thumbsStatus, [itemId]: 'thumbedDown' }));
    }
  };

  return (
    <div>
      <h2>Menu Items</h2>

      {/* Show the Create button only if user is logged in */}
      {user ? (
        <Link to="/menu-items/new">
          <button className="create-button">
            Create New Menu Item
          </button>
        </Link>
      ) : (
        <p>You must <Link to="/login">login</Link> to create a new menu item.</p>
      )}

      {menuItems.length === 0 ? (
        <p>No menu items available.</p>
      ) : (
        <div className="menu-container">
          {menuItems.map(item => (
            <div className="menu-item" key={item.id}>
              <h2>
                <Link to={`/restaurants/${item.restaurantId}`}>
                  {getRestaurantLabel(item.restaurantId)}
                </Link>
              </h2>

              <h3>
                <Link to={`/menu-items/${item.id}`}>
                  {item.name}
                </Link>
              </h3> 

              <p> ${item.price}</p>
              <img src={item.food_image} alt={item.name} />
              
              {/* Display Thumbs Up with persistent number */}
              <p className="thumbs-up">
                <span 
                  role="img" 
                  aria-label="thumbs-up" 
                  style={{ cursor: 'pointer' }} 
                  onClick={() => handleThumbsUp(item.id)}
                >
                  👍
                </span> 
                {thumbsUpCounts[item.id] || 0}
                {thumbsStatus[item.id] === 'thumbedUp' && <span> (You liked it!)</span>}
              </p>

              {/* Thumbs Down Button */}
              {thumbsStatus[item.id] === 'thumbedUp' && (
                <button 
                  onClick={() => handleThumbsDown(item.id)}
                  style={{ cursor: 'pointer' }}
                >
                  👎 Undo
                </button>
              )}

              {/* The + button positioned at the bottom right */}
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(item)}
              >
                +
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItemList;
