from datetime import datetime
from app.models import db, Restaurant, SCHEMA, environment
from app.models.restaurants import CuisineType, PriceLevel
from sqlalchemy.sql import text


def seed_restaurants():
    restaurants = [
        Restaurant(
            owner_id=1,
            address="123 East Houston St",
            city="New York",
            state="NY",
            zip=10002,
            name="Taco Casa",
            cuisine_type=CuisineType.MEXICAN,
            delivery_fee=3.99,
            business_hours="11:00 AM - 10:00 PM",
            servicing=True,
            store_image="https://media-private.canva.com/B2rQE/MAGec4B2rQE/1/p.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWF6QO3UH4PAAJ6Q%2F20250207%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250207T113447Z&X-Amz-Expires=44744&X-Amz-Signature=98f5f6ec0d1c2e02916368258b5088c5f42d36e643dad1be6300afa76d01e2b8&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Sat%2C%2008%20Feb%202025%2000%3A00%3A31%20GMT",
            description="Authentic Mexico City street tacos and hand-pressed tortillas",
            price_level=PriceLevel.INEXPENSIVE,
            delivery_time=30,
        ),
        Restaurant(
            owner_id=1,
            address="789 Broadway",
            city="New York",
            state="NY",
            zip=10003,
            name="El Mariachi",
            cuisine_type=CuisineType.MEXICAN,
            delivery_fee=4.99,
            business_hours="10:00 AM - 11:00 PM",
            servicing=True,
            store_image="https://example.com/elmariachi.jpg",
            description="Family-style Mexican dining with fresh guacamole and artisanal mezcal",
            price_level=PriceLevel.MODERATE,
            delivery_time=35,
        ),
        Restaurant(
            owner_id=2,
            address="456 9th Avenue",
            city="New York",
            state="NY",
            zip=10018,
            name="Olive Grove",
            cuisine_type=CuisineType.MEDITERRANEAN,
            delivery_fee=4.99,
            business_hours="12:00 PM - 10:00 PM",
            servicing=True,
            store_image="https://example.com/olivegrove.jpg",
            description="Classic Mediterranean mezze and grilled specialties",
            price_level=PriceLevel.MODERATE,
            delivery_time=40,
        ),
        Restaurant(
            owner_id=2,
            address="234 7th Avenue",
            city="New York",
            state="NY",
            zip=10011,
            name="Blue Mediterranean",
            cuisine_type=CuisineType.MEDITERRANEAN,
            delivery_fee=5.99,
            business_hours="11:30 AM - 9:30 PM",
            servicing=True,
            store_image="https://example.com/bluemed.jpg",
            description="Fresh seafood and traditional Mediterranean dishes with a modern twist",
            price_level=PriceLevel.EXPENSIVE,
            delivery_time=45,
        ),
        Restaurant(
            owner_id=3,
            address="567 2nd Avenue",
            city="New York",
            state="NY",
            zip=10016,
            name="Thai Orchid",
            cuisine_type=CuisineType.THAI,
            delivery_fee=3.99,
            business_hours="11:00 AM - 10:30 PM",
            servicing=True,
            store_image="https://example.com/thaiorchid.jpg",
            description="Authentic Thai curries and noodles with fresh herbs from our garden",
            price_level=PriceLevel.VERY_EXPENSIVE,
            delivery_time=35,
        ),
        Restaurant(
            owner_id=3,
            address="890 1st Avenue",
            city="New York",
            state="NY",
            zip=10022,
            name="Bangkok Kitchen",
            cuisine_type=CuisineType.THAI,
            delivery_fee=4.99,
            business_hours="11:30 AM - 10:00 PM",
            servicing=True,
            store_image="https://example.com/bangkokkitchen.jpg",
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
