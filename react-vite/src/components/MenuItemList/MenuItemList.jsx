import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuItems } from '../../redux/menuItems';
import { addToCart } from '../../redux/cart';
import { Link } from 'react-router-dom';
import './MenuItemList.css';

const MenuItemList = () => {
	const dispatch = useDispatch();
	const menuItems = useSelector((state) => state.menuItems.menuItems);
	const error = useSelector((state) => state.menuItems.error);
	const isLoading = useSelector((state) => state.menuItems.isLoading);
	const user = useSelector((state) => state.session.user); // Get user state

	useEffect(() => {
		dispatch(getMenuItems());
	}, [dispatch]);

	if (error) {
		return <div>Error: {error}</div>;
	}

	const handleAddToCart = (item) => {
		const orderData = {
			menuItemId: item.id,
			name: item.name,
			price: item.price,
			quantity: 1, // default quantity is 1
		};

		dispatch(addToCart(orderData));
	};

	return (
		<div>
			<h2>Menu Items</h2>

			{/* Show "Create New Menu Item" button only if user is logged in */}
			{user && (
				<Link to='/menu-items/new'>
					<button className='create-button'>Create New Menu Item</button>
				</Link>
			)}

			{menuItems.length === 0 ? (
				<p>No menu items available.</p>
			) : (
				<div className='menu-container'>
					{menuItems.map((item) => (
						<div className='menu-item' key={item.id}>
							<h2>
								<Link to={`/restaurants/${item.restaurantId}`}>
									{item.restaurant_name}
								</Link>
							</h2>

							<h3>
								<Link to={`/menu-items/${item.id}`}>{item.name}</Link>
							</h3>

							<p> ${item.price}</p>
							<img src={item.food_image} alt={item.name} />

							{/* The + button positioned at the bottom right */}
							<button
								className='add-to-cart-btn'
								onClick={() => handleAddToCart(item)}>
								+
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default MenuItemList;
