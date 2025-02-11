import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMenuItem, getMenuItem } from '../../redux/menuItems'; // Make sure path is correct
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate instead of useHistory

const UpdateMenuItem = () => {
  const { id } = useParams(); // Get the `id` from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    food_image: '',
    food_type: 'appetizer',
  });

  const menuItem = useSelector((state) => state.menuItems.menuItem);
  const error = useSelector((state) => state.menuItems.error);

  useEffect(() => {
    if (id) {
      dispatch(getMenuItem(id)); // Fetch the item data when editing
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (menuItem && id) {
      setFormData({
        name: menuItem.name,
        description: menuItem.description,
        price: menuItem.price,
        food_image: menuItem.food_image,
        food_type: menuItem.food_type,
      });
    }
  }, [menuItem, id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMenuItem(id, formData)); // Dispatch the action to update the item
    navigate(`/menu-items/${id}`); // Redirect to the updated menu item detail page
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Menu Item</h3>
      
      <input 
        type="text" 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
        placeholder="Name" 
        required 
      />
      <textarea 
        name="description" 
        value={formData.description} 
        onChange={handleChange} 
        placeholder="Description" 
        required 
      />
      <input 
        type="number" 
        name="price" 
        value={formData.price} 
        onChange={handleChange} 
        placeholder="Price" 
        required 
      />
      <input 
        type="text" 
        name="food_image" 
        value={formData.food_image} 
        onChange={handleChange} 
        placeholder="Food Image URL" 
        required 
      />
      <select name="food_type" value={formData.food_type} onChange={handleChange} required>
        <option value="appetizer">Appetizer</option>
        <option value="entree">Entree</option>
        <option value="dessert">Dessert</option>
        <option value="beverage">Beverage</option>
      </select>
      
      <button type="submit">Update Menu Item</button>
    </form>
  );
};

export default UpdateMenuItem;
