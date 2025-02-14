import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CartItems() {
	const navigate = useNavigate();
	const handleCartItemClick = (menuItemId) => {
		if (menuItemId) {
			navigate(`/menu-items/${menuItemId}`);
		}
	};

	const currentOrder = useSelector((state) => state.orders.currentOrder);

	return (
		<div>
			{currentOrder?.orderItems && currentOrder.orderItems.length > 0 ? (
				currentOrder.orderItems.map((item) => (
					<div
						key={item.id}
						className='summary-item'
						onClick={(e) => {
							e.stopPropagation();
							handleCartItemClick(item.menu_item_id);
						}}
						style={{
							cursor: 'pointer',
						}}>
						<p>
							{item.name || item.menu_item_name || 'Unavailable Item'} x
							{item.quantity || 1}
						</p>
						<p>${item.price ? item.price.toFixed(2) : '0.00'}</p>
					</div>
				))
			) : (
				<p>No items found.</p>
			)}
		</div>
	);
}