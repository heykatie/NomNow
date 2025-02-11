import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './Cart.css';

export default function Cart() {
	const cartItems = useSelector((store) => store.orders.currentOrder);

	return (
		<NavLink to='/cart' className='cart-container'>
			<FaShoppingCart className='cart-icon' />
			{cartItems?.length > 0 && (
				<span className='cart-badge'>{cartItems.length}</span>
			)}
		</NavLink>
	);
}
