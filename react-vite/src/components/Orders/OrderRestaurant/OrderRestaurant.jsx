import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {getRestaurant} from '../../../redux/restaurants'
import './OrderRestaurant.css';


export default function OrderRestaurant({ restaurant }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [restaurantData, setRestaurantData] = useState(restaurant);
	const currentOrder = useSelector((state) => state.orders.currentOrder);
	// const restaurantFromStore = useSelector(
	// 	(state) => state.restaurants.currentRestaurant
	// );

	// const getRestaurantData = () => {
	// 	if (location.pathname === '/checkout') {
	// 		return currentOrder?.restaurant;
	// 	}
	// 	return restaurantFromStore?.restaurant;
	// };

	// const restaurant = getRestaurantData();

	// useEffect(() => {
	// 	if (location.pathname !== '/checkout') {
	// 		dispatch(getRestaurant(restaurantId));
	// 	}
	// }, [dispatch, restaurantId, location.pathname]);
	console.log('KATIE', restaurant);

	useEffect(() => {
		if (location.pathname == '/checkout') {
			setRestaurantData(currentOrder?.restaurant || restaurant);
		}
	}, [currentOrder, restaurant, location.pathname]);

	return (
		<div
			className='restaurant-header'
			onClick={() => navigate(`/restaurants/${restaurantData.id}`)}>
			<img
				src={
					restaurantData?.storeImage ||
					restaurantData?.image ||
					'/images/cart.jpeg'
				}
				alt={restaurantData?.name || 'Unknown Restaurant'}
				className='restaurant-img'></img>
			<div className='restaurant-info'>
				<h3>{restaurantData?.name || 'Restaurant Name Not Available'}</h3>
				<p className='restaurant-address'>
					{restaurantData?.address
						? `${restaurantData.address}, ${restaurantData.city || ''}`
						: 'Address Not Available'}
				</p>
			</div>
			<span className='arrow'>➜</span>
		</div>
	);
}
