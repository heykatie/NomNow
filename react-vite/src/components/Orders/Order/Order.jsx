import OrderRestaurant from "../OrderRestaurant";
import CartItems from "../../Cart/CartItems";

export default function Order({items}) {
  return (
    <div>
			<OrderRestaurant restaurant={items[0].restaurant} />
      <CartItems items={items} />
		</div>
  );
}