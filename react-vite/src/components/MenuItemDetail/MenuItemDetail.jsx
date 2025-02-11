import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuItem } from '../../redux/menuItems';  // Update the path as necessary
import { useParams, Link, useNavigate } from 'react-router-dom';  // Import useNavigate

const MenuItemDetail = () => {
  const { id } = useParams();  // Get 'id' from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Initialize useNavigate here
  const menuItem = useSelector(state => state.menuItems.menuItem);
  const error = useSelector(state => state.menuItems.error);
  console.log("============>>>>>",menuItem)

  useEffect(() => {
    if (id) {
      dispatch(getMenuItem(id));  // Fetch the details of the specific menu item
    }
  }, [dispatch, id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!menuItem) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Button to navigate back */}
      <button onClick={() => navigate('/menu-items')} style={{ marginTop: '20px' }}>
        Back to Menu Items List
      </button>
      
      <h2>{menuItem.name}</h2>
      <p>{menuItem.description}</p>
      <p>Price: ${menuItem.price}</p>
      <p>{menuItem.food_type}</p>
      <img src={menuItem.food_image} alt={menuItem.name} style={{ width: '200px', height: '200px' }} />
      
      {/* Link to the Update Menu Item page */}
      <Link to={`/menu-items/${menuItem.id}/update`} style={{ marginRight: '10px' }}>
        <button>Update Menu Item</button>
      </Link>

      {/* Link to the MenuItemDelete confirmation page */}
      <Link to={`/menu-items/${menuItem.id}/delete`}>
        <button style={{ backgroundColor: 'red', color: 'white' }}>
          Delete Menu Item
        </button>
      </Link>
    </div>
  );
};

export default MenuItemDetail;
