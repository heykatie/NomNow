import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteMenuItem } from '../../redux/menuItems';
import { useHistory } from 'react-router-dom';

const MenuItem = ({ item }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = () => {
    dispatch(deleteMenuItem(item.id));
  };

  const handleEdit = () => {
    history.push(`/edit-menu-item/${item.id}`);
  };

  return (
    <div>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>${item.price}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default MenuItem;
