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
    restaurant_name: '', // Use restaurant_name instead of restaurant_id
  });

  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear validation errors when the user types
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: '',
    }));
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};

    // Validate restaurant name (check if it exists in the backend)
    if (!formData.restaurant_name.trim()) {
      errors.restaurant_name = 'Restaurant name is required.';
    }

    // Validate description (minimum 5 characters)
    if (formData.description.length < 5) {
      errors.description = 'Description must be at least 5 characters long.';
    }

    // Validate price (must be greater than 0)
    if (formData.price <= 0) {
      errors.price = 'Price must be greater than 0.';
    }

    // Validate image URL (must be a valid URL)
    try {
      new URL(formData.food_image); // Throws an error if the URL is invalid
    } catch (err) {
      errors.food_image = 'Please enter a valid image URL.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!validateForm()) {
      return; // Stop submission if there are validation errors
    }

    const newItemData = { ...formData };

    try {
      // Dispatch the action to create the new item
      const createdItem = await dispatch(createMenuItem(newItemData));

      // If the item is created successfully, navigate to the detail page of the newly created item
      if (createdItem && createdItem.id) {
        navigate(`/menu-items/${createdItem.id}`); // Navigate to the detail page of the newly created item
      }
    } catch (err) {
      setError('Failed to create menu item. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Button to navigate back */}
      <button onClick={() => navigate('/menu-items')} style={{ marginTop: '20px' }}>
        Back to Menu Items List
      </button>

      <h3>Create Menu Item</h3>

      {/* Display error message if any */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Name Field */}
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
      </div>

      {/* Description Field */}
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        {validationErrors.description && (
          <div style={{ color: 'red' }}>{validationErrors.description}</div>
        )}
      </div>

      {/* Price Field */}
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        {validationErrors.price && (
          <div style={{ color: 'red' }}>{validationErrors.price}</div>
        )}
      </div>

      {/* Food Image URL Field */}
      <div>
        <label>Food Image URL:</label>
        <input
          type="text"
          name="food_image"
          value={formData.food_image}
          onChange={handleChange}
          placeholder="Food Image URL"
          required
        />
        {validationErrors.food_image && (
          <div style={{ color: 'red' }}>{validationErrors.food_image}</div>
        )}
      </div>

      {/* Food Type Dropdown */}
      <div>
        <label>Food Type:</label>
        <select
          name="food_type"
          value={formData.food_type}
          onChange={handleChange}
          required
        >
          <option value="appetizer">Appetizer</option>
          <option value="entree">Entree</option>
          <option value="dessert">Dessert</option>
          <option value="beverage">Beverage</option>
        </select>
      </div>

      {/* Restaurant Name Field */}
      <div>
        <label>Restaurant Name:</label>
        <input
          type="text"
          name="restaurant_name"
          value={formData.restaurant_name}
          onChange={handleChange}
          placeholder="Restaurant Name"
          required
        />
        {validationErrors.restaurant_name && (
          <div style={{ color: 'red' }}>{validationErrors.restaurant_name}</div>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit">Create Menu Item</button>
    </form>
  );
};

export default CreateMenuItem;