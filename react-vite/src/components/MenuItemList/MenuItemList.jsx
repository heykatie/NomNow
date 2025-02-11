import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuItems } from '../../redux/menuItems';  // Update the path as necessary
import { Link } from 'react-router-dom';  // Import Link to navigate to the create page

const MenuItemList = () => {
  const dispatch = useDispatch();
  const menuItems = useSelector(state => state.menuItems.menuItems);
  const error = useSelector(state => state.menuItems.error);
  console.log("============>>>>>",menuItems)
  useEffect(() => {
    dispatch(getMenuItems());  // Dispatch the action to get menu items
  }, [dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Menu Items</h2>

      {/* Create New Item Button */}
      <Link to="/menu-items/new">
        <button style={{ marginBottom: '20px', padding: '10px 20px', backgroundColor: 'green', color: 'white' }}>
          Create New Menu Item
        </button>
      </Link>

      {menuItems.length === 0 ? (
        <p>No menu items available.</p>
      ) : (
        <ul>
          {menuItems.map(item => (
            <li key={item.id}>
              <div>
                <h3>
                  <Link to={`/menu-items/${item.id}`}>
                    {item.name}
                  </Link>
                </h3> 
                <p>Price: ${item.price}</p>
                <img src={item.food_image} style={{ width: '200px', height: '200px' }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenuItemList;
