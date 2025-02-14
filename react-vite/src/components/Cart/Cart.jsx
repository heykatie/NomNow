import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { checkoutCart } from '../../redux/cart';
import Order from '../Orders/Order';
import './Cart.css';

export default function Cart() {
	// const currentOrder = useSelector((store) => store.orders.currentOrder);
	const cartItems = useSelector((store) => store.cart.cartItems) || [];
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleCheckout = () => {
		dispatch(checkoutCart());
		navigate('/checkout')
	};

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [isOpen]);

	return (
		<>
			<button className='cart-container' onClick={() => setIsOpen(true)}>
				<FaShoppingCart className='cart-icon' />
				<span className='cart-badge'>{cartItems?.length || 0}</span>
			</button>

			<div className={`cart-panel ${isOpen ? 'open' : ''}`}>
				<div className='cart-header'>
					<button className='close-btn' onClick={() => setIsOpen(false)}>
						<FaTimes />
					</button>
				</div>

				{cartItems.length > 0 ? (
					<Order items={cartItems } />
				) : (
					<div className='empty-cart'>
						<img
							src='/images/cart.jpeg'
							alt='Empty cart'
							className='cart-image'
						/>
						<h3>Add items to start a cart</h3>
						<p>
							Once you add items from a restaurant or store, your cart
							will appear here.
						</p>
						<button
							className='start-shopping-btn'
							onClick={() => {
								setIsOpen(false);
								navigate('/home');
							}}>
							Start shopping
						</button>
					</div>
				)}

				{cartItems.length > 0 && (
					<div className='cart-footer'>
						<p>
							Subtotal: $
							{cartItems
								.reduce(
									(acc, item) => acc + item.price * item.quantity,
									0
								)
								.toFixed(2)}
						</p>
						<button onClick={handleCheckout} className='checkout-btn'>
							Go to checkout
						</button>
					</div>
				)}
			</div>

			{isOpen && (
				<div
					className='cart-overlay'
					onClick={() => setIsOpen(false)}></div>
			)}
		</>
	);
}
