import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteMenuItem } from '../redux/menuActions';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteMenuItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteMenuItem(id));
    navigate('/');
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Menu Item</button>
    </div>
  );
};

export default DeleteMenuItem;
