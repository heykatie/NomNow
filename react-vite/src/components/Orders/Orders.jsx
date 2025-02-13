import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // reviews hook
import { useDispatch, useSelector } from 'react-redux';
import {
	getUserOrders,
	loadUserOrder,
	createOrder,
	clearCurrentOrder,
} from '../../redux/orders';
import OrderItem from '../OrderItem';
import './Orders.css';

export default function Orders() {
	const dispatch = useDispatch();
	const navigate = useNavigate(); // reviews hook
	const error = useSelector((state) => state.errors.message || '');
	// const currentOrder = useSelector((store) => store.orders.currentOrder || {});
	const orders = useSelector((state) => state.orders.userOrders || []);
	const isLoading = !orders || orders.length === 0;

	useEffect(() => {
		dispatch(getUserOrders());
	}, [dispatch]);

	if (isLoading) return <div>Loading orders...</div>;
	if (error) return <div className='error-message'>{error}</div>;
	if (!orders.length) return <div>No past orders found.</div>;

	// Handle "Rate your order" button
	const handleRateOrder = (orderId, restaurantId, restaurantName) => {
		navigate(
			`/reviews/restaurant/${restaurantId}?orderId=${orderId}&restaurantName=${encodeURIComponent(
				restaurantName
			)}`
		);
	};

	const handleReorder = async (order) => {
		if (!order || !order.orderItems || order.orderItems.length === 0) {
			console.error('No past orders found.');
			return;
		}

		try {
			dispatch(clearCurrentOrder());
			// Extract restaurant ID
			const restaurantId = order.restaurant?.id;
			if (!restaurantId) {
				console.error('Missing restaurant_id in order:', order);
				return;
			}

			// Format the items to match the API request
			const items = order.orderItems.map((item) => ({
				menu_item_id: item.menu_item_id, // Ensure correct menu item ID
				quantity: item.quantity,
				restaurant_id: item.restaurant_id,
			}));

			const reorderData = {
				restaurant_id: restaurantId,
				items,
			};

			// Send the request to create a new order
			const response = await dispatch(createOrder(reorderData));

			if (response?.payload) {
				const newOrder = response.payload;

				// Update Redux state and localStorage
				dispatch(loadUserOrder(newOrder));
				localStorage.setItem('currentOrder', JSON.stringify(newOrder));

				// Navigate to checkout
				navigate('/checkout');
			} else {
				console.error('Failed to create reorder.');
			}
		} catch (error) {
			console.error('Error creating reorder:', error);
		}
	};

	return (
		<div className='orders-container'>
			<h2>Past Orders</h2>
			{orders.map((order) => (
				<div key={order.id} className='order-card'>
					<img
						src={order.restaurant?.image || '/images/cart.jpeg'}
						alt={order.restaurant?.name || 'Unknown Restaurant'}
						className='restaurant-img'
					/>
					<div className='order-header'>
						<div className='order-restaurant'>
							<h3>{order.restaurant?.name || 'Unknown Restaurant'}</h3>
						</div>
						<div className='order-details'>
							<p>
								{Array.isArray(order.orderItems)
									? order.orderItems.length
									: 0}{' '}
								item
								{order.orderItems?.length > 1 ? 's' : ''} for $
								{Number(order.totalCost).toFixed(2) || '0.00'}{' '}
							</p>
							•
							<p>
								{order.createdAt
									? new Date(order.createdAt).toLocaleString()
									: 'No Date Available'}
							</p>
							•{/* Order Actions */}
							<div className='order-actions'>
								<a href={`/orders/${order.id}/receipt`}>View receipt</a>
								•
								<a href={`/orders/${order.id}/invoice`}>
									Request Invoice
								</a>
							</div>
						</div>
						{/* Order Items */}
						<div className='order-items'>
							{Array.isArray(order.orderItems) ? (
								order.orderItems.map((item) => (
									<OrderItem key={item.id} item={item} />
								))
							) : (
								<p>No items found</p>
							)}
						</div>
					</div>

					{/* Buttons */}
					<div className='order-buttons'>
						<button className='reorder-btn' onClick={()=>handleReorder(order)}>
							Reorder
						</button>
						<button
							className='rate-btn'
							disabled={order.status !== 'Completed'} // Make sure order is completed to rate
							onClick={
								() =>
									handleRateOrder(
										order.id,
										order.restaurant?.id,
										order.restaurant?.name
									) // Pass restaurant name
							}>
							Rate your order
						</button>
					</div>
				</div>
			))}
		</div>
	);
}


// const handleReorder = async (order) => {
// 	console.log('Reordering order:', order);

// 	if (!order || !order.orderItems) {
// 		console.error('Invalid order data');
// 		return;
// 	}

// 	const uniqueRestaurantIds = new Set(
// 		order.orderItems.map((item) => item.restaurant_id)
// 	);
// 	if (uniqueRestaurantIds.size > 1) {
// 		console.error('All items must be from the same restaurant.');
// 		return;
// 	}

// 	try {
// 		const response = await fetch('/api/orders/reorder', {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify({ orderId: order.id }),
// 		});

// 		if (!response.ok) {
// 			throw new Error('Failed to reorder');
// 		}

// 		const newOrder = await response.json();
// 		dispatch(setCurrentOrder(newOrder));
// 		navigate('/checkout');
// 	} catch (error) {
// 		console.error('Error creating reorder:', error);
// 	}
// };