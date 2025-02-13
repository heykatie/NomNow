import { useNavigate } from 'react-router-dom';
import './OrderItem.css';

export default function OrderItem({ item }) {
	const navigate = useNavigate(); 
	const handleMenuItemClick = (menuItemId) => {
		if (menuItemId) {
			navigate(`/menu-items/${menuItemId}`);
		}
	};

	return (
		<div
			className='order-item'
			onClick={(e) => {
				e.stopPropagation();
				handleMenuItemClick(item.menu_item_id);
			}}
			style={{
				cursor: 'pointer',
			}}>
			<div className='order-item-details'>
				<span className='quantity'>{item.quantity}x </span>
				<span className='item-name'>
					{item.name || item.menu_item_name || 'Unnamed Item'}
				</span>
			</div>
			{item.customizations && (
				<p className='customizations'>{item.customizations}</p>
			)}
		</div>
	);
}
