from app.models import db, OrderItem, environment, SCHEMA, MenuItem
from sqlalchemy.sql import text
import random


def seed_order_items():
    order_items = []
    restaurant_menu_items = {}

    # Group menu items by restaurant
    menu_items = MenuItem.query.all()
    for item in menu_items:
        if item.restaurant_id not in restaurant_menu_items:
            restaurant_menu_items[item.restaurant_id] = []
        restaurant_menu_items[item.restaurant_id].append(item.id)

    for order_id in range(1, 31):  # Loop through 30 orders
        if not restaurant_menu_items:
            continue

        # Pick a random restaurant for this order
        restaurant_id = random.choice(list(restaurant_menu_items.keys()))
        menu_items_for_restaurant = restaurant_menu_items[restaurant_id]

        num_items = random.randint(1, 3)  # Each order gets 1 to 3 items

        for _ in range(num_items):
            menu_item_id = random.choice(menu_items_for_restaurant)
            quantity = random.randint(1, 3)  # Random quantity per item
            price = MenuItem.query.get(menu_item_id).price  # Get price from DB

            order_items.append(
                OrderItem(
                    order_id=order_id,
                    menu_item_id=menu_item_id,
                    quantity=quantity,
                    price=price,
                )
            )

    db.session.add_all(order_items)
    db.session.commit()


def undo_order_items():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.order_items RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM order_items"))

    db.session.commit()


# from app.models import db, OrderItem, environment, SCHEMA
# from sqlalchemy.sql import text


# def seed_order_items():
#     order_item1 = OrderItem(
#         order_id=1,
#         menu_item_id=1,  # Appetizer 1
#         quantity=2,
#         price=8.50,
#     )
#     order_item2 = OrderItem(
#         order_id=1,
#         menu_item_id=2,  # Appetizer 2
#         quantity=1,
#         price=15.50,
#     )
#     order_item3 = OrderItem(
#         order_id=2,
#         menu_item_id=3,  # Entree 1
#         quantity=1,
#         price=12.99,
#     )
#     order_item4 = OrderItem(
#         order_id=2,
#         menu_item_id=4,  # Entree 2
#         quantity=2,
#         price=7.50,
#     )
#     order_item5 = OrderItem(
#         order_id=3,
#         menu_item_id=5,  # Dessert 1
#         quantity=2,
#         price=9.75,
#     )
#     order_item6 = OrderItem(
#         order_id=3,
#         menu_item_id=6,  # Dessert 2
#         quantity=1,
#         price=5.99,
#     )
#     order_item7 = OrderItem(
#         order_id=4,
#         menu_item_id=7,  # Drink 1
#         quantity=3,
#         price=4.00,
#     )
#     order_item8 = OrderItem(
#         order_id=4,
#         menu_item_id=8,  # Drink 2
#         quantity=1,
#         price=6.99,
#     )
#     order_item9 = OrderItem(
#         order_id=5,
#         menu_item_id=9,  # Another Appetizer
#         quantity=1,
#         price=10.99,
#     )
#     order_item10 = OrderItem(
#         order_id=6,
#         menu_item_id=10,  # Another Drink
#         quantity=2,
#         price=9.00,
#     )

#     db.session.add_all(
#         [
#             order_item1,
#             order_item2,
#             order_item3,
#             order_item4,
#             order_item5,
#             order_item6,
#             order_item7,
#             order_item8,
#             order_item9,
#             order_item10,
#         ]
#     )
#     db.session.commit()


# def undo_order_items():
#     if environment == "production":
#         db.session.execute(
#             f"TRUNCATE table {SCHEMA}.order_items RESTART IDENTITY CASCADE;"
#         )
#     else:
#         db.session.execute(text("DELETE FROM order_items"))

#     db.session.commit()
