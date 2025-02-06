from app.models import db, environment, SCHEMA
from app.models.orders import Orders
from sqlalchemy.sql import text
import datetime


def seed_orders():
    order1 = Orders(
        user_id=1,
        item_id=2,
        quantity=3,
        promo="DISCOUNT10",
    )
    order2 = Orders(
        user_id=2,
        item_id=5,
        quantity=1,
        promo=None,
    )
    order3 = Orders(
        user_id=3,
        item_id=1,
        quantity=2,
        promo="FREESHIP",
    )
    order4 = Orders(
        user_id=4,
        item_id=3,
        quantity=4,
        promo=None,
    )
    order5 = Orders(
        user_id=5,
        item_id=4,
        quantity=2,
        promo="WELCOME5",
    )

    db.session.add_all([order1, order2, order3, order4, order5])
    db.session.commit()


def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
