import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMenuItem, getMenuItem } from '../../redux/menuItems';
import { useParams, useNavigate } from 'react-router-dom';

const EditMenuItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuItem = useSelector((state) => state.menu.menuItem);
  
  const [formData, setFormData] = useState({
    name: '',
    foodType: '',
    description: '',
    price: '',
    foodImage: '',
  });

  useEffect(() => {
    dispatch(getMenuItem(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (menuItem) {
      setFormData({
        name: menuItem.name,
        foodType: menuItem.foodType,
        description: menuItem.description,
        price: menuItem.price,
        foodImage: menuItem.foodImage,
      });
    }
  }, [menuItem]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMenuItem(id, formData));
    navigate(`/menu-items/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="text" name="foodType" value={formData.foodType} onChange={handleChange} placeholder="Food Type" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
      <input type="text" name="foodImage" value={formData.foodImage} onChange={handleChange} placeholder="Image URL" required />
      <button type="submit">Update Menu Item</button>
    </form>
  );
};

export default EditMenuItem;
