// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CartItems.css';

export default function CartItems({ items }) {
	const navigate = useNavigate();
	const handleCartItemClick = (menuItemId) => {
		if (menuItemId) {
			navigate(`/menu-items/${menuItemId}`);
		}
	};

	// const currentOrder = useSelector((state) => state.orders.currentOrder);

	return (
		<div className='cart-items-container'>
			{items && items.length > 0 ? (
				items.map((item) => (
					<div
						key={item.id}
						className='cart-item'
						onClick={(e) => {
							e.stopPropagation();
							handleCartItemClick(item.menu_item_id);
						}}>
						<img
							src={item.food_image || '/images/cart.jpeg'}
							alt={item.name || 'Menu Item'}
							className='cart-item-image'
						/>

						<div className='cart-item-details'>
							<p className='cart-item-name'>
								{item.name || item.menu_item_name || 'Unavailable Item'}
							</p>
							{item.options && (
								<p className='cart-item-options'>{item.options}</p>
							)}
							{item.extras && (
								<p className='cart-item-extras'>{item.extras}</p>
							)}
							<p className='cart-item-price'>
								${item.price ? item.price.toFixed(2) : '0.00'}
							</p>
						</div>

						<div className='cart-item-quantity'>{item.quantity || 1}</div>
					</div>
				))
			) : (
				<p className='empty-cart-message'>No items found.</p>
			)}
		</div>
	);
}
