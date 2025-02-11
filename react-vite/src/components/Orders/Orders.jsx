import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../redux/orders';
import OrderItem from './OrderItem';
import './Orders.css';

export const Orders = () => {
	const dispatch = useDispatch();
	const orders = useSelector((state) => state.orders.userOrders);
	const error = useSelector((state) => state.errors.message);
	const isLoading = !orders;

	useEffect(() => {
		dispatch(getUserOrders());
	}, [dispatch]);

	if (isLoading) return <div>Loading orders...</div>;
	if (error) return <div className='error-message'>{error}</div>;
	if (orders.length === 0) return <div>No past orders found.</div>;

	return (
		<div className='orders-container'>
			<h2>Past Orders</h2>
			{orders.map((order) => (
				<div key={order.id} className='order-card'>
					<div className='order-header'>
						<h3>{order.restaurantName}</h3>
						<p>
							{order.items.length} item
							{order.items.length > 1 ? 's' : ''} for $
							{order.totalCost.toFixed(2)}
						</p>
						<p>{new Date(order.createdAt).toLocaleString()}</p>
					</div>

					{/* Order Items */}
					<div className='order-items'>
						{order.orderItems.map((item) => (
							<OrderItem key={item.id} item={item} />
						))}
					</div>

					{/* Order Actions */}
					<div className='order-actions'>
						<a href={`/orders/${order.id}/receipt`}>View receipt</a>
						<a href={`/orders/${order.id}/invoice`}>Request Invoice</a>
					</div>

					{/* Buttons */}
					<div className='order-buttons'>
						<button className='reorder-btn'>Reorder</button>
						<button
							className='rate-btn'
							disabled={order.status !== 'Submitted'}>
							Rate your order
						</button>
					</div>
				</div>
			))}
		</div>
	);
};