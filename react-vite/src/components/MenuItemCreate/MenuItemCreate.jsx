import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createMenuItem } from '../../redux/menuItems';
import { fetchUserRestaurants } from '../../redux/restaurants'; // Add this action

const CreateMenuItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user); // Get the logged-in user
  const userRestaurants = useSelector((state) => state.restaurants.userRestaurants); // Get user's restaurants

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    food_image: '',
    food_type: 'appetizer',
    restaurant_name: '',
  });

  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // Fetch user's restaurants when the component mounts
  useEffect(() => {
    if (user) {
      dispatch(fetchUserRestaurants(user.id));
    }
  }, [dispatch, user]);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: '',
    }));
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};

    if (!formData.restaurant_name.trim()) {
      errors.restaurant_name = 'Restaurant name is required.';
    }

    if (formData.description.length < 5) {
      errors.description = 'Description must be at least 5 characters long.';
    }

    if (formData.price <= 0) {
      errors.price = 'Price must be greater than 0.';
    }

    try {
      new URL(formData.food_image);
    } catch (err) {
      errors.food_image = 'Please enter a valid image URL.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newItemData = { ...formData };

    try {
      const createdItem = await dispatch(createMenuItem(newItemData));
      if (createdItem && createdItem.id) {
        navigate(`/menu-items/${createdItem.id}`);
      }
    } catch (err) {
      setError('Failed to create menu item. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button onClick={() => navigate('/menu-items')} style={{ marginTop: '20px' }}>
        Back to Menu Items List
      </button>

      <h3>Create Menu Item</h3>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Restaurant Name Dropdown */}
      <div>
        <label>Restaurant:</label>
        <select
          name="restaurant_name"
          value={formData.restaurant_name}
          onChange={handleChange}
          required
        >
          <option value="">Select a restaurant</option>
          {userRestaurants.map((restaurant) => (
            <option key={restaurant.id} value={restaurant.name}>
              {restaurant.name}
            </option>
          ))}
        </select>
        {validationErrors.restaurant_name && (
          <div style={{ color: 'red' }}>{validationErrors.restaurant_name}</div>
        )}
      </div>

      {/* Other form fields */}
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

      <button type="submit">Create Menu Item</button>
    </form>
  );
};

export default CreateMenuItem;