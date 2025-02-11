import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMenuItem } from '../../redux/menuItems'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const CreateMenuItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate hook
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    food_image: '',
    food_type: 'appetizer',
  });

  const [error, setError] = useState(null);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItemData = { ...formData };

    try {
      // Dispatch the action and wait for the new item to be returned
      const createdItem = await dispatch(createMenuItem(newItemData));

      // Navigate to the newly created menu item's detail page after creation
      if (createdItem && createdItem.id) {
        navigate(`/menu-items/${createdItem.id}`);
      }
    } catch (err) {
      setError('Failed to create menu item. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Menu Item</h3>

      {error && <div style={{ color: 'red' }}>{error}</div>}  {/* Display error message if any */}

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

      <button type="submit">Create Menu Item</button>
    </form>
  );
};

export default CreateMenuItem;
