import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuItems } from '../../redux/menuItems';  
import { Link } from 'react-router-dom';  
import './MenuItemList.css';  

const MenuItemList = () => {
  const dispatch = useDispatch();
  const menuItems = useSelector(state => state.menuItems.menuItems);
  const error = useSelector(state => state.menuItems.error);

  useEffect(() => {
    dispatch(getMenuItems());
  }, [dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
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

  return (
    <div>
      <h2>Menu Items</h2>

      <Link to="/menu-items/new">
        <button className="create-button">
          Create New Menu Item
        </button>
      </Link>

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

              <p>Price: ${item.price}</p>
              <img src={item.food_image} alt={item.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItemList;
