from app.models import db, Order, environment, SCHEMA, MenuItem
from sqlalchemy.sql import text
import random

def seed_orders():
    orders = []
    restaurant_menu_items = {}

    # Group menu items by restaurant
    menu_items = MenuItem.query.all()
    for item in menu_items:
        if item.restaurant_id not in restaurant_menu_items:
            restaurant_menu_items[item.restaurant_id] = []
        restaurant_menu_items[item.restaurant_id].append(item.id)

    for restaurant_id, menu_item_ids in restaurant_menu_items.items():
        num_orders = random.randint(3, 6)  # Create 3-6 orders per restaurant

        for _ in range(num_orders):
            order = Order(
                restaurant_id=restaurant_id,
                user_id=random.randint(1, 5),
                total_cost=round(random.uniform(15, 100), 2),
                status=random.choice(["Submitted", "Completed", "Active", "Canceled"]),
                promo=random.choice(["APP10", None]),
            )
            orders.append(order)

    db.session.add_all(orders)
    db.session.commit()


def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()

# from app.models import db, Order, environment, SCHEMA
# from sqlalchemy.sql import text


# def seed_orders():
#     order1 = Order(
#         restaurant_id=1,  # Restaurant A (Appetizers)
#         user_id=1,
#         total_cost=32.50,
#         status="Completed",
#         promo=None,
#     )
#     order2 = Order(
#         restaurant_id=2,  # Restaurant B (Appetizers)
#         user_id=2,
#         total_cost=27.99,
#         status="Active",
#         promo="APP10",
#     )
#     order3 = Order(
#         restaurant_id=3,  # Restaurant C (Entrees)
#         user_id=3,
#         total_cost=65.20,
#         status="Canceled",
#         promo=None,
#     )
#     order4 = Order(
#         restaurant_id=4,  # Restaurant D (Entrees)
#         user_id=4,
#         total_cost=45.00,
#         status="Completed",
#         promo="FREESHIP",
#     )
#     order5 = Order(
#         restaurant_id=5,  # Restaurant E (Desserts)
#         user_id=5,
#         total_cost=20.75,
#         status="Active",
#         promo=None,
#     )
#     order6 = Order(
#         restaurant_id=6,  # Restaurant F (Drinks)
#         user_id=1,
#         total_cost=18.00,
#         status="Completed",
#         promo=None,
#     )

#     db.session.add_all([order1, order2, order3, order4, order5, order6])
#     db.session.commit()


# def undo_orders():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM orders"))

#     db.session.commit()
