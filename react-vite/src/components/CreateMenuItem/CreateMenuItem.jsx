import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMenuItem } from '../../redux/menuItems';
import { useNavigate } from 'react-router-dom';

const CreateMenuItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    foodType: '',
    description: '',
    price: '',
    foodImage: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createMenuItem(formData));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="text" name="foodType" value={formData.foodType} onChange={handleChange} placeholder="Food Type" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
      <input type="text" name="foodImage" value={formData.foodImage} onChange={handleChange} placeholder="Image URL" required />
      <button type="submit">Create Menu Item</button>
    </form>
  );
};

export default CreateMenuItem;
