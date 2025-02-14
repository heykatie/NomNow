import OrderRestaurant from "../OrderRestaurant";
import CartItems from "../../Cart/CartItems";

export default function Order({items}) {
  return (
		<div>
			<OrderRestaurant restaurant={items.item.restaurant.id} />
      <CartItems items={items} />
		</div>
  );
}