import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import './OrderRestaurant.css';


export default function OrderRestaurant({restaurant}) {
	const navigate = useNavigate();
  // const  = useSelector((state) => state.orders.);

	return (
		<div
			className='restaurant-header'
			onClick={() => navigate(`/restaurants/${restaurant.id}`)}>
			<img
				src={restaurant?.image || '/images/cart.jpeg'}
				alt={restaurant?.name || 'Unknown Restaurant'}
				className='restaurant-img' ></img>
			<div className='restaurant-info'>
				<h3>
					{restaurant?.name ||
						'Restaurant Name Not Available'}
				</h3>
				<p className='restaurant-address'>
					{restaurant?.address
						? `${restaurant.address}, ${
								restaurant.city || ''
						}`
						: 'Address Not Available'}
				</p>
			</div>
			<span className='arrow'>➜</span>
		</div>
	);
}
