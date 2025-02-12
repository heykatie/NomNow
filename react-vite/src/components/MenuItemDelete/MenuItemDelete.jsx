import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMenuItem, getMenuItem } from '../../redux/menuItems';
import { useParams, useNavigate } from 'react-router-dom';

const MenuItemDelete = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuItemName, setMenuItemName] = useState('');
  const menuItem = useSelector(state => state.menuItems.menuItem);
  const error = useSelector(state => state.menuItems.error);

  useEffect(() => {
    if (id) {
      dispatch(getMenuItem(id));  // Fetch the menu item details
    }
  }, [dispatch, id]);

  // Update the menuItemName once the menuItem is fetched
  useEffect(() => {
    if (menuItem) {
      setMenuItemName(menuItem.name);
    }
  }, [menuItem]);

  const handleDelete = () => {
    dispatch(deleteMenuItem(id));  // Dispatch delete action
    navigate('/menu-items');  // Redirect to the menu items list page after delete
  };

  const handleCancel = () => {
    navigate(`/menu-items/${id}`);  // Redirect back to the original menu item detail page
  };

  if (error) {
    return <div>Error: {error}</div>;
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
