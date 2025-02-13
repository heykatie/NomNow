import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // reviews hook
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders, loadUserOrder, createOrder } from '../../redux/orders';
import OrderItem from '../OrderItem';
import './Orders.css';

export default function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // reviews hook
  const orders = useSelector((state) => state.orders.userOrders || []);
  const error = useSelector((state) => state.errors.message || '');
  const isLoading = !orders;
	const currentOrder = useSelector((store) => store.orders.currentOrder || {});


  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  if (isLoading) return <div>Loading orders...</div>;
  if (error) return <div className='error-message'>{error}</div>;
  if (orders.length === 0) return <div>No past orders found.</div>;

	// console.log('Orders from Redux:', orders);

  // Handle "Rate your order" button
  const handleRateOrder = (orderId, restaurantId, restaurantName) => {
    navigate(`/reviews/restaurant/${restaurantId}?orderId=${orderId}&restaurantName=${encodeURIComponent(restaurantName)}`);
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
						<button
							className='reorder-btn'
							onClick={async () => {
								try {
									// Ensure the correct restaurant_id is used
									const restaurantId = order.restaurant?.id;
									const filteredItems = order.orderItems.filter(
										(item) => item.restaurant_id === restaurantId
									);

									const reorderedOrder = {
										restaurant_id: restaurantId,
										items: filteredItems.map((item) => ({
											menu_item_id: item.id,
											quantity: item.quantity,
										})),
									};

									// Send request to create a new order
									const response = await dispatch(
										createOrder(reorderedOrder)
									);

									if (response?.payload) {
										const newOrder = response.payload;

										// Set the new order as currentOrder in Redux
										dispatch(loadUserOrder(newOrder));

										// Save new order to localStorage to persist on refresh
										localStorage.setItem(
											'currentOrder',
											JSON.stringify(newOrder)
										);

										// Navigate to checkout
										navigate('/checkout');
									}
								} catch (error) {
									console.error('Error creating reorder:', error);
								}
							}}>
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