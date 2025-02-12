import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Checkout.css';

export default function Checkout() {
	const location = useLocation();
	const navigate = useNavigate();
	const user = useSelector((state) => state.session.user);
	const [orderDetails, setOrderDetails] = useState(
		location.state?.order || null
	);
	const [tip, setTip] = useState(0);

	useEffect(() => {
		if (location.state?.order) {
			setOrderDetails(location.state.order);
		} else {
			navigate('/home');
		}
  }, [location.state, navigate]);

	const subtotal = orderDetails.totalCost || 0;
	const deliveryFee = 6.49; // Example fixed delivery fee
	const taxes = subtotal * 0.1; // Example tax calculation (10% of subtotal)
	const total = subtotal + deliveryFee + taxes + tip;

	return (
		<div className='checkout-page'>
			<div className='checkout-left'>
				{/* Delivery Details */}
				<div className='delivery-section'>
					<h3>Delivery details</h3>
					<div className='address'>
						<p>
							<strong>
								{user?.address || 'Delivery Address Not Provided'}
							</strong>
						</p>
						<p>
							{user?.city
								? `${user.city}, ${user.state}`
								: 'City, State'}
						</p>
					</div>
					<div className='delivery-instructions'>
						<p>
							{user?.deliveryInstructions ||
								'No delivery instructions provided.'}
						</p>
					</div>
				</div>

				{/* Delivery Options */}
				<div className='delivery-options'>
					<h3>Delivery options</h3>
					<div className='option priority'>
						<span>⚡ Priority</span>
						<span className='extra-fee'>
							+ ${orderDetails?.priorityFee || '0.00'}
						</span>
					</div>
					<div className='option selected'>
						📦{' '}
						{orderDetails?.standardDeliveryTime ||
							'Standard Delivery (Time Unavailable)'}
					</div>
					<div className='option'>
						⏰{' '}
						{orderDetails?.scheduledDeliveryTime ||
							'Schedule Time Not Available'}
					</div>
				</div>

				{/* Payment */}
				<div className='payment-section'>
					<h3>Payment</h3>
					<div className='payment-method'>
						<span>
							💳{' '}
							{orderDetails?.paymentMethod ||
								'Payment Method Not Available'}
						</span>
						<button>Edit</button>
					</div>
				</div>

				{/* Place Order Button */}
				<button className='confirm-order-btn'>Place order</button>
			</div>

			{/* Right Sidebar - Order Summary */}
			<div className='checkout-right'>
				<h3>{orderDetails.restaurant?.name}</h3>

				<div className='order-summary'>
					<h4>Order Summary</h4>
					{orderDetails?.orderItems?.length ? (
						orderDetails.orderItems.map((item) => (
							<div key={item.id} className='summary-item'>
								<p>
									{item.name || item.menu_item_name || 'Unavailable Item'} x{item.quantity || 1}
								</p>
								<p>${item.price ? item.price.toFixed(2) : '0.00'}</p>
							</div>
						))
					) : (
						<p>No items found.</p>
					)}
				</div>

				{/* Tip Selection */}
				<div className='tip-section'>
					<h4>Add a tip</h4>
					<p>100% of your tip goes to your courier.</p>
					<div className='tip-buttons'>
						{[0.15, 0.2, 0.25, 0.3].map((percentage) => (
							<button
								key={percentage}
								className={
									tip === subtotal * percentage ? 'selected-tip' : ''
								}
								onClick={() => setTip(subtotal * percentage)}>
								{`${percentage * 100}%`}
							</button>
						))}
						<button>Other</button>
					</div>
				</div>

				{/* Final Total */}
				<div className='order-total'>
					<p>Subtotal: ${subtotal.toFixed(2)}</p>
					<p>
						Delivery Fee: $
						{orderDetails?.deliveryFee
							? orderDetails.deliveryFee.toFixed(2)
							: '0.00'}
					</p>
					<p>
						Taxes & Fees: $
						{orderDetails?.taxes ? orderDetails.taxes.toFixed(2) : '0.00'}
					</p>
					<p>Tip: ${tip.toFixed(2)}</p>
					<h3>
						Total: $
						{(
							subtotal +
							(orderDetails?.deliveryFee || 0) +
							(orderDetails?.taxes || 0) +
							tip
						).toFixed(2)}
					</h3>
				</div>
			</div>
		</div>
	);
}