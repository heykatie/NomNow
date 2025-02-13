import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function OrderRestaurant() {
	const navigate = useNavigate();
  const currentOrder = useSelector((state) => state.orders.currentOrder);

	return (
		<div
			className='restaurant-header'
			onClick={() => navigate(`/restaurants/${currentOrder.restaurant.id}`)}>
			<img
				src={currentOrder.restaurant?.image || '/images/cart.jpeg'}
				alt={currentOrder.restaurant?.name || 'Unknown Restaurant'}
				className='restaurant-img' ></img>
			<div className='restaurant-info'>
				<h3>
					{currentOrder.restaurant?.name ||
						'Restaurant Name Not Available'}
				</h3>
				<p className='restaurant-address'>
					{currentOrder.restaurant?.address
						? `${currentOrder.restaurant.address}, ${
								currentOrder.restaurant.city || ''
						}`
						: 'Address Not Available'}
				</p>
			</div>
			<span className='arrow'>➜</span>
		</div>
	);
}
