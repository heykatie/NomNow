import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuItem } from '../../redux/menuItems';
import { addToCart } from '../../redux/orders';  // Import addToCart action from orders
import { useParams, Link, useNavigate } from 'react-router-dom';

const MenuItemDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuItem = useSelector(state => state.menuItems.menuItem);
  const error = useSelector(state => state.menuItems.error);

  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(getMenuItem(id));
    }
  }, [dispatch, id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!menuItem) {
    return <div>Loading...</div>;
  }

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    const orderData = {
      menuItemId: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity,
    };

    // Dispatch the action to add item to the cart
    dispatch(addToCart(orderData));

    // Reset quantity to 1
    setQuantity(1);

    // Show confirmation message
    setMessage(`${quantity} ${menuItem.name} added to cart!`);

    // Clear message after 2 seconds
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div>
      {/* Button to navigate back */}
      <button onClick={() => navigate('/menu-items')} style={{ marginTop: '20px' }}>
        Back to Menu Items List
      </button>
      
      <h2>{menuItem.name}</h2>
      <p>{menuItem.description}</p>
      <p>Price: ${menuItem.price}</p>
      <p>{menuItem.food_type}</p>
      <img src={menuItem.food_image} alt={menuItem.name} style={{ width: '200px', height: '200px' }} />

      {/* Quantity Selection */}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <button onClick={decreaseQuantity} style={{ padding: '5px 10px', fontSize: '20px' }}>-</button>
        <span style={{ margin: '0 10px', fontSize: '18px' }}>{quantity}</span>
        <button onClick={increaseQuantity} style={{ padding: '5px 10px', fontSize: '20px' }}>+</button>
      </div>

      {/* Add to Cart Button */}
      <button 
        onClick={handleAddToCart} 
        style={{ marginLeft: '10px', fontSize: '18px', padding: '8px 15px', marginTop: '10px' }}>
        + Add {quantity} to Cart
      </button>

      {/* Confirmation Message */}
      {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
      
      <br /><br />

      {/* Link to the Update Menu Item page */}
      <Link to={`/menu-items/${menuItem.id}/update`} style={{ marginRight: '10px' }}>
        <button>Update Menu Item</button>
      </Link>

      {/* Link to the MenuItemDelete confirmation page */}
      <Link to={`/menu-items/${menuItem.id}/delete`}>
        <button style={{ backgroundColor: 'red', color: 'white' }}>
          Delete Menu Item
        </button>
      </Link>
    </div>
  );
};

export default MenuItemDetail;
