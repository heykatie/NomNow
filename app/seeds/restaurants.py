from datetime import datetime
from app.models import db, Restaurant, SCHEMA
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
            name='Taco Casa',
            cuisineType= cuisineType.MEXICAN,
            deliveryFee=3.99,
            businessHours='11:00 AM - 10:00 PM',
            Servicing=True,
            storeImage='https://media-private.canva.com/B2rQE/MAGec4B2rQE/1/p.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWF6QO3UH4PAAJ6Q%2F20250207%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250207T113447Z&X-Amz-Expires=44744&X-Amz-Signature=98f5f6ec0d1c2e02916368258b5088c5f42d36e643dad1be6300afa76d01e2b8&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Sat%2C%2008%20Feb%202025%2000%3A00%3A31%20GMT',
            description='Authentic Mexico City street tacos and hand-pressed tortillas',
            priceLevel= priceLevel.INEXPENSIVE,
            deliveryTime=30,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Restaurant(
            ownerId=1,
            address='789 Broadway',
            city='New York',
            state='NY',
            zip=10003,
            name='El Mariachi',
            cuisineType=cuisineType.MEXICAN,
            deliveryFee=4.99,
            businessHours='10:00 AM - 11:00 PM',
            Servicing=True,
            storeImage='https://example.com/elmariachi.jpg',
            description='Family-style Mexican dining with fresh guacamole and artisanal mezcal',
            priceLevel= priceLevel.MODERATE,
            deliveryTime=35,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Restaurant(
            ownerId=2,
            address='456 9th Avenue',
            city='New York',
            state='NY',
            zip=10018,
            name='Olive Grove',
            cuisineType=cuisineType.MEDITERRANEAN,
            deliveryFee=4.99,
            businessHours='12:00 PM - 10:00 PM',
            Servicing=True,
            storeImage='https://example.com/olivegrove.jpg',
            description='Classic Mediterranean mezze and grilled specialties',
            priceLevel= priceLevel.MODERATE,
            deliveryTime=40,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Restaurant(
            ownerId=2,
            address='234 7th Avenue',
            city='New York',
            state='NY',
            zip=10011,
            name='Blue Mediterranean',
            cuisineType=cuisineType.MEDITERRANEAN,
            deliveryFee=5.99,
            businessHours='11:30 AM - 9:30 PM',
            Servicing=True,
            storeImage='https://example.com/bluemed.jpg',
            description='Fresh seafood and traditional Mediterranean dishes with a modern twist',
            priceLevel=priceLevel.EXPENSIVE,
            deliveryTime=45,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Restaurant(
            ownerId=3,
            address='567 2nd Avenue',
            city='New York',
            state='NY',
            zip=10016,
            name='Thai Orchid',
            cuisineType=cuisineType.THAI,
            deliveryFee=3.99,
            businessHours='11:00 AM - 10:30 PM',
            Servicing=True,
            storeImage='https://example.com/thaiorchid.jpg',
            description='Authentic Thai curries and noodles with fresh herbs from our garden',
            priceLevel=priceLevel.VERY_EXPENSIVE,
            deliveryTime=35,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Restaurant(
            ownerId=3,
            address='890 1st Avenue',
            city='New York',
            state='NY',
            zip=10022,
            name='Bangkok Kitchen',
            cuisineType=cuisineType.THAI,
            deliveryFee=4.99,
            businessHours='11:30 AM - 10:00 PM',
            Servicing=True,
            storeImage='https://example.com/bangkokkitchen.jpg',
            description='Modern Thai cuisine featuring street food favorites and regional specialties',
            priceLevel=priceLevel.MODERATE,
            deliveryTime=40,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
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
