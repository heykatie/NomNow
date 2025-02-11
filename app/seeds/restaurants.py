from datetime import datetime
from app.models import db, Restaurant, SCHEMA, environment
from app.models.restaurants import cuisineType, priceLevel
from sqlalchemy.sql import text



def seed_restaurants():
    restaurants = [
        Restaurant(
            ownerId=1,
            address='123 East Houston St',
            city='New York',
            state='NY',
            zip=10002,
            name="Taco Casa",
            cuisine_type=CuisineType.MEXICAN,
            delivery_fee=3.99,
            business_hours="11:00 AM - 10:00 PM",
            servicing=True,
            store_image="/images/TacoCasa.jpg",
            description="Authentic Mexico City street tacos and hand-pressed tortillas",
            price_level=PriceLevel.INEXPENSIVE,
            delivery_time=30,
        ),
        Restaurant(
            ownerId=1,
            address='789 Broadway',
            city='New York',
            state='NY',
            zip=10003,
            name="El Mariachi",
            cuisine_type=CuisineType.MEXICAN,
            delivery_fee=4.99,
            business_hours="10:00 AM - 11:00 PM",
            servicing=True,
            store_image="/images/El_Mariachi.jpg",
            description="Family-style Mexican dining with fresh guacamole and artisanal mezcal",
            price_level=PriceLevel.MODERATE,
            delivery_time=35,
        ),
        Restaurant(
            ownerId=2,
            address='456 9th Avenue',
            city='New York',
            state='NY',
            zip=10018,
            name="Olive Grove",
            cuisine_type=CuisineType.MEDITERRANEAN,
            delivery_fee=4.99,
            business_hours="12:00 PM - 10:00 PM",
            servicing=True,
            store_image="/images/Olive_Grove",
            description="Classic Mediterranean mezze and grilled specialties",
            price_level=PriceLevel.MODERATE,
            delivery_time=40,
        ),
        Restaurant(
            ownerId=2,
            address='234 7th Avenue',
            city='New York',
            state='NY',
            zip=10011,
            name="Blue Mediterranean",
            cuisine_type=CuisineType.MEDITERRANEAN,
            delivery_fee=5.99,
            business_hours="11:30 AM - 9:30 PM",
            servicing=True,
            store_image="/images/Blue_Med.jpg",
            description="Fresh seafood and traditional Mediterranean dishes with a modern twist",
            price_level=PriceLevel.EXPENSIVE,
            delivery_time=45,
        ),
        Restaurant(
            ownerId=3,
            address='567 2nd Avenue',
            city='New York',
            state='NY',
            zip=10016,
            name="Thai Orchid",
            cuisine_type=CuisineType.THAI,
            delivery_fee=3.99,
            business_hours="11:00 AM - 10:30 PM",
            servicing=True,
            store_image="/images/Thai_Orchid.jpg",
            description="Authentic Thai curries and noodles with fresh herbs from our garden",
            price_level=PriceLevel.VERY_EXPENSIVE,
            delivery_time=35,
        ),
        Restaurant(
            ownerId=3,
            address='890 1st Avenue',
            city='New York',
            state='NY',
            zip=10022,
            name="Bangkok Kitchen",
            cuisine_type=CuisineType.THAI,
            delivery_fee=4.99,
            business_hours="11:30 AM - 10:00 PM",
            servicing=True,
            store_image="/images/Bangkok_Kit.jpg",
            description="Modern Thai cuisine featuring street food favorites and regional specialties",
            price_level=PriceLevel.MODERATE,
            delivery_time=40,
        ),
    ]

    for restaurant in restaurants:
        db.session.add(restaurant)

    db.session.commit()

def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
