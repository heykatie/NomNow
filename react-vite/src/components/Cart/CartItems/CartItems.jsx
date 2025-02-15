import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateItemQuantity, removeFromCart } from '../../../redux/cart';
import { editOrder } from '../../../redux/orders';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import './CartItems.css';
import { useEffect } from 'react';

export default function CartItems({ items }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const currentOrder = useSelector((state) => state.orders.currentOrder);

	const handleCartItemClick = (menuItemId) => {
		if (menuItemId) {
			navigate(`/menu-items/${menuItemId}`);
		}
	};

	const handleIncrease = (item) => {
		if (currentOrder) {
			const updatedItems = currentOrder.orderItems.map((i) =>
				i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
			);

			dispatch(editOrder(currentOrder.id, { orderItems: updatedItems }));
		} else {
			dispatch(updateItemQuantity(item.id, item.quantity + 1));
		}
	};

	// const handleDecrease = (item) => {
	// 	if (currentOrder) {
	// 		if (item.quantity > 1) {
	// 			dispatch(
	// 				editOrder(currentOrder.id, {
	// 					orderItems: currentOrder.orderItems.map((i) =>
	// 						i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
	// 					),
	// 				})
	// 			);
	// 		} else {
	// 			dispatch(
	// 				editOrder(currentOrder.id, {
	// 					orderItems: currentOrder.orderItems.filter(
	// 						(i) => i.id !== item.id
	// 					),
	// 				})
	// 			);
	// 		}
	// 	} else {
	// 			if (item.quantity > 1) {
	// 				dispatch(updateItemQuantity(item.id, item.quantity - 1));
	// 			} else {
	// 				dispatch(removeFromCart(item.id));
	// 			}

	// 	}
	// };

	const handleDecrease = (item) => {
		if (currentOrder) {
			const updatedItems =
				item.quantity > 1
					? currentOrder.orderItems.map((i) =>
							i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
					)
					: currentOrder.orderItems.filter((i) => i.id !== item.id);

			dispatch(editOrder(currentOrder.id, { orderItems: updatedItems }));
		} else {
			if (item.quantity > 1) {
				dispatch(updateItemQuantity(item.id, item.quantity - 1));
			} else {
				dispatch(removeFromCart(item.id));
			}
		}
	};

	if (currentOrder) {
		items = currentOrder.orderItems;
	}

	return (
		<div className='cart-items-container'>
			{items && items.length > 0 ? (
				items.map((item) => (
					<div
						key={`${item.id}-${item.name}`}
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

						<div className='cart-item-quantity-controls'>
							<button
								className='quantity-btn'
								onClick={(e) => {
									e.stopPropagation();
									handleDecrease(item);
								}}>
								{item.quantity > 1 ? (
									<FaMinus color='black' />
								) : (
									<FaTrash />
								)}
							</button>
							<span className='cart-item-quantity'>
								{item.quantity || 1}
							</span>
							<button
								className='quantity-btn'
								onClick={(e) => {
									e.stopPropagation();
									handleIncrease(item);
								}}>
								<FaPlus />
							</button>
						</div>
					</div>
				))
			) : (
				<p className='empty-cart-message'>No items found.</p>
			)}
		</div>
	);
}
