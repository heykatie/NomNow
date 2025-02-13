import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import TipModal from '../../context/TipModal';
import ScheduleModal from '../../context/ScheduleModal';
import { loadUserOrder, placeOrder } from '../../redux/orders';
import { deductFundsThunk } from '../../redux/session';
import OrderRestaurant from '../OrderRestaurant';
import CartItems from '../CartItems';
import './Checkout.css';

export default function Checkout() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.session.user);
	const { setModalContent } = useModal();
	const currentOrder = useSelector((state) => state.orders.currentOrder);
	const [tip, setTip] = useState(0);
	const [customTipUsed, setCustomTipUsed] = useState(false);
	const [deliveryOption, setDeliveryOption] = useState('standard');
	const [scheduledTime, setScheduledTime] = useState(null);
	const restaurantClosingTime =
		currentOrder?.restaurant?.closingTime || '20:00';
	const [paymentMethod, setPaymentMethod] = useState('credit-card');

	const subtotal = parseInt(currentOrder.totalCost) || 0;
	const baseDeliveryFee = 6.49;
	const priorityFee = 1.49;
	const taxes = subtotal * 0.1;
	const deliveryFee =
		deliveryOption === 'priority'
			? baseDeliveryFee + priorityFee
			: baseDeliveryFee;
	const orderTotal = subtotal + deliveryFee + taxes;
	const total = subtotal + deliveryFee + taxes + tip;

	const openTipModal = () => {
		setModalContent(
			<TipModal
				orderTotal={orderTotal}
				setTip={setTip}
				setCustomTipUsed={setCustomTipUsed}
			/>
		);
	};

	const openScheduleModal = () => {
		setModalContent(
			<ScheduleModal
				setScheduledTime={setScheduledTime}
				restaurantClosingTime={restaurantClosingTime}
			/>
		);
	};

	const handlePlaceOrder = async () => {
		// if (!currentOrder) {
		// 	console.error('No current order found, cannot proceed.');
		// 	return;
		// }

		// if (currentOrder.status !== 'Active') {
		// 	console.error('Order cannot be placed, it is already processed.');
		// 	return;
		// }

		if (paymentMethod === 'wallet') {
			if (user.wallet < total) {
				alert('Insufficient funds in your wallet.');
				return;
			}

			// Deduct funds from wallet
			await dispatch(deductFundsThunk({ id: user.id, amount: total }));
		}

		await dispatch(placeOrder(currentOrder.id));

		// Wait for Redux and localStorage updates
		setTimeout(() => {
			const updatedOrder = JSON.parse(
				localStorage.getItem('currentOrder')
			);
			if (updatedOrder && updatedOrder.status === 'Submitted') {
				navigate('/orders');
			}
		}, 500);
	};

	useEffect(() => {
		if (!currentOrder) {
			const savedOrder = JSON.parse(localStorage.getItem('currentOrder'));
			if (savedOrder) {
				dispatch(loadUserOrder(savedOrder)); // Restore Redux state from localStorage
			} else {
				navigate('/orders'); // Redirect if no order is found
			}
		}
	}, [currentOrder, navigate, dispatch]);

	if (!currentOrder) {
		navigate('/orders');
		return null; // Prevents further rendering
	}

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
					<div
						className={`option priority ${
							deliveryOption === 'priority' ? 'selected' : ''
						}`}
						onClick={() => setDeliveryOption('priority')}>
						<span>
							⚡ Priority <span className='faster-badge'>Faster</span>
						</span>
						<span className='extra-fee'>+${priorityFee.toFixed(2)}</span>
						<span>15-30 min</span>
					</div>
					<div
						className={`option standard ${
							deliveryOption === 'standard' ? 'selected' : ''
						}`}
						onClick={() => setDeliveryOption('standard')}>
						<span>📦 Standard</span>
						<span>20-35 min</span>
					</div>
					<div
						className={`option schedule ${
							deliveryOption === 'schedule' ? 'selected' : ''
						}`}
						onClick={() => {
							setDeliveryOption('schedule');
							openScheduleModal();
						}}>
						<span>⏰ Schedule</span>
						<span>{scheduledTime ? scheduledTime : 'Choose a time'}</span>
					</div>
				</div>

				{/* Payment */}
				<div className='payment-section'>
					<h3>Payment</h3>
					<div className='payment-options'>
						<div
							className={`option credit-card ${
								paymentMethod === 'credit-card' ? 'selected' : ''
							}`}
							onClick={() => setPaymentMethod('credit-card')}>
							<span>💳 Credit Card</span>
							<span>
								{currentOrder?.paymentMethod || '**** **** **** 1234'}
							</span>
						</div>
						<div
							className={`option wallet ${
								paymentMethod === 'wallet' ? 'selected' : ''
							}`}
							onClick={() => setPaymentMethod('wallet')}>
							<span>💰 Credits</span>
							<span>
								Balance: ${parseInt(user?.wallet)?.toFixed(2) || '0.00'}
							</span>
						</div>
					</div>
				</div>

				{/* Place Order Button */}
				<button className='confirm-order-btn' onClick={handlePlaceOrder}>
					Place order
				</button>
			</div>

			{/* Right Sidebar - Order Summary */}
			<div className='checkout-right'>
				<OrderRestaurant />
				<div className='order-summary'>
					<h4>Cart summary ({currentOrder?.orderItems?.length} item/s)</h4>
					<CartItems />
				</div>

				{/* Order Total Section including Tip */}
				<div className='order-total'>
					<h3>Order total</h3>
					<p>Subtotal: ${subtotal.toFixed(2)}</p>
					<p>Delivery Fee: ${deliveryFee.toFixed(2)}</p>
					<p>Taxes & Other Fees: ${taxes.toFixed(2)}</p>

					{/* Tip Selection*/}
					<div className='tip-section'>
						<h4>
							Add a tip <span className='tooltip'></span>
						</h4>
						<p>100% of your tip goes to your courier.</p>
						<div className='tip-buttons'>
							{[0.15, 0.2, 0.25, 0.3].map((percentage) => (
								<button
									key={percentage}
									className={
										tip === subtotal * percentage
											? 'selected-tip'
											: ''
									}
									onClick={() => {
										setTip(subtotal * percentage);
										setCustomTipUsed(false);
									}}>
									{`${percentage * 100}%`}
								</button>
							))}
							<button
								className={customTipUsed ? 'selected-tip' : ''}
								onClick={openTipModal}>
								Other
							</button>
						</div>
						<p>Tip: ${tip.toFixed(2)}</p>
					</div>

					<h3>Total: ${total.toFixed(2)}</h3>
				</div>
			</div>
		</div>
	);
}