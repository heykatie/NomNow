from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text


def seed_orders():
    order1 = Order(
        restaurant_id=1,  # Restaurant A (Appetizers)
        user_id=1,
        total_cost=32.50,
        status="Completed",
        promo=None,
    )
    order2 = Order(
        restaurant_id=2,  # Restaurant B (Appetizers)
        user_id=2,
        total_cost=27.99,
        status="Active",
        promo="APP10",
    )
    order3 = Order(
        restaurant_id=3,  # Restaurant C (Entrees)
        user_id=3,
        total_cost=65.20,
        status="Canceled",
        promo=None,
    )
    order4 = Order(
        restaurant_id=4,  # Restaurant D (Entrees)
        user_id=4,
        total_cost=45.00,
        status="Completed",
        promo="FREESHIP",
    )
    order5 = Order(
        restaurant_id=5,  # Restaurant E (Desserts)
        user_id=5,
        total_cost=20.75,
        status="Active",
        promo=None,
    )
    order6 = Order(
        restaurant_id=6,  # Restaurant F (Drinks)
        user_id=1,
        total_cost=18.00,
        status="Completed",
        promo=None,
    )

    db.session.add_all([order1, order2, order3, order4, order5, order6])
    db.session.commit()


def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
