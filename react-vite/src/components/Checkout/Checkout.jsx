import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
	const [orderDetails, setOrderDetails] = useState(
		location.state?.order || null
	);

	// useEffect(() => {
	// 	if (!orderDetails) {
	// 		navigate('/home');
	// 	}
  // }, [orderDetails]);

  useEffect(() => {
		if (location.state?.order) {
			setOrderDetails(location.state.order);
		} else {
			navigate('/home');
		}
  }, [location.state]);

	if (!orderDetails) return null;

	return (
		<div className='checkout-container'>
			<h2>Checkout</h2>
			<p>
				Reordering from: <strong>{orderDetails.restaurant?.name}</strong>
			</p>
			<p>
				Total: $
				{orderDetails?.totalCost
					? orderDetails.totalCost.toFixed(2)
					: '0.00'}
			</p>

			<div className='checkout-items'>
				{orderDetails?.orderItems?.length ? (
					orderDetails.orderItems.map((item) => (
						<div key={item.id} className='checkout-item'>
							<p>
								{item.name} - {item.quantity}x
							</p>
							<p>${item.price.toFixed(2)}</p>
						</div>
					))
				) : (
					<p>No items found.</p>
				)}
			</div>

			<button className='confirm-order-btn'>Confirm Order</button>
		</div>
	);
}
