import OrderRestaurant from "../OrderRestaurant";
import CartItems from "../../Cart/CartItems";

export default function Order({ items, closeCart }) {
	return (
		<div>
			<OrderRestaurant
				restaurant={items[0].restaurant}
				closeCart={closeCart}
			/>
			<CartItems items={items} closeCart={closeCart} />
		</div>
	);
}