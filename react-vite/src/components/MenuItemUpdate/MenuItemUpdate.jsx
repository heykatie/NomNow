import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMenuItem, getMenuItem } from '../../redux/menuItems';
import { useNavigate, useParams } from 'react-router-dom';
import './MenuItemUpdate.css';

const UpdateMenuItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    food_image: '',
    food_type: 'appetizer',
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    price: '',
    food_image: '',
  });

  const menuItem = useSelector((state) => state.menuItems.menuItem);
  const error = useSelector((state) => state.menuItems.error);
  const user = useSelector((state) => state.session.user);

  const hasCheckedAuth = useRef(false);

  useEffect(() => {
    if (id) {
      dispatch(getMenuItem(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (menuItem && user && menuItem.restaurant_owner_id === user.id) {
      setFormData({
        name: menuItem.name,
        description: menuItem.description,
        price: menuItem.price,
        food_image: menuItem.food_image,
        food_type: menuItem.food_type,
      });
    }
  }, [menuItem, user]);



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let isValid = true;
    let errorMessages = { name: '', description: '', price: '', food_image: '' };

   // Name validation
if (!/^[A-Za-z\s]+$/.test(formData.name.trim()) || formData.name.trim() === '') {
  errorMessages.name = 'Name must be a string and cannot contain only numbers.';
  isValid = false;
}


    // Description validation
    if (typeof formData.description !== 'string' || formData.description.length < 5) {
      errorMessages.description = 'Description must be at least 5 characters and a string.';
      isValid = false;
    }

    // Price validation
    if (formData.price <= 0 || isNaN(formData.price)) {
      errorMessages.price = 'Price must be greater than zero.';
      isValid = false;
    }

    // Food Image URL validation
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(formData.food_image)) {
      errorMessages.food_image = 'Food image must be a valid URL.';
      isValid = false;
    }

    setErrors(errorMessages);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(updateMenuItem(id, formData))
        .then(() => {
          dispatch(getMenuItem(id));
          navigate(`/restaurants/${menuItem.restaurant_owner_id}/menu`);
        })
        .catch((error) => {
          console.error('Update failed:', error);
        });
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!menuItem || menuItem.restaurant_owner_id !== user?.id) {
    return null;
  }

  return (
    <div className="update-menu-item-container">
      <button className="back-button" type="button" onClick={() => navigate(`/restaurants/manage`)}>
        Back to Manage
      </button>

      <form className="update-menu-item-form" onSubmit={handleSubmit}>
        <h3>Update Menu Item</h3>

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
          {errors.name && <div className="error-message">{errors.name}</div>}
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
          {errors.description && <div className="error-message">{errors.description}</div>}
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
          {errors.price && <div className="error-message">{errors.price}</div>}
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
          {errors.food_image && <div className="error-message">{errors.food_image}</div>}
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

        <button type="submit" className="submit-button">
          Update Menu Item
        </button>
      </form>
    </div>
  );
};

export default UpdateMenuItem;
