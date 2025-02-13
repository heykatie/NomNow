import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMenuItem, getMenuItem } from '../../redux/menuItems';
import { useParams, useNavigate } from 'react-router-dom';

const MenuItemDelete = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuItemName, setMenuItemName] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false); // Track authorization
  const menuItem = useSelector((state) => state.menuItems.menuItem);
  const error = useSelector((state) => state.menuItems.error);
  const user = useSelector((state) => state.session.user); // Logged-in user

  // Fetch the menu item details when the component mounts or the ID changes
  useEffect(() => {
    if (id) {
      dispatch(getMenuItem(id));
    }
  }, [dispatch, id]);

  // Check if the user owns the restaurant associated with the menu item
  useEffect(() => {
    if (menuItem && user) {
      const restaurantOwnerId = menuItem.restaurant_owner_id; // Ensure this field is included in the API response
      if (user.id === restaurantOwnerId) {
        setIsAuthorized(true); // User is authorized
        setMenuItemName(menuItem.name); // Set the menu item name
      } else {
        alert('You are not authorized to delete this menu item.');
        navigate('/menu-items'); // Redirect to the menu items list
      }
    }
  }, [menuItem, user, navigate]);

  // Handle delete action
  const handleDelete = () => {
    dispatch(deleteMenuItem(id)).then(() => {
      navigate('/menu-items'); // Redirect to the menu items list page after delete
    });
  };

  // Handle cancel action
  const handleCancel = () => {
    navigate(`/menu-items/${id}`); // Redirect back to the menu item detail page
  };

  // Display error if any
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Only render the delete confirmation if the user is authorized
  if (!isAuthorized) {
    return null; // Do not render the delete confirmation page
  }

  return (
    <div>
      <h2>Are you sure you want to delete {menuItemName}?</h2>
      <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
        Yes, Delete
      </button>
      <button onClick={handleCancel} style={{ marginLeft: '10px' }}>
        Cancel
      </button>
    </div>
  );
};

export default MenuItemDelete;