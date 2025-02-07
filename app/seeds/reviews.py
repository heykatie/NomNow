from app.models import db, Review
from datetime import datetime

def seed_reviews():
    reviews = [
        Review(
            restaurantId=1,
            userId=1,
            orderId=1,
            review="The food was incredible and came out quickly! Definitely coming back.",
            orderRating=5,
            restaurantRating=4,  
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=1,
            userId=2,
            orderId=2,
            review="Food was delicious, but a bit too spicy for my taste. Still good overall.",
            orderRating=4,
            restaurantRating=4,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=1,
            userId=3,
            orderId=3,
            review="A decent experience. The service was fast, but the food could have been hotter.",
            orderRating=3,
            restaurantRating=3,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=1,
            userId=4,
            orderId=4,
            review="Absolutely fantastic! The flavor was on point, and the ambiance was great.",
            orderRating=5,
            restaurantRating=5,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=1,
            userId=5,
            orderId=5,
            review="Not the best experience. The food took longer than expected to arrive.",
            orderRating=2,
            restaurantRating=3,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=2,
            userId=1,
            orderId=6,
            review="Food was okay, but delivery was late and the order was cold.",
            orderRating=3,
            restaurantRating=3,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=2,
            userId=2,
            orderId=7,
            review="The food had good flavors, but the portion sizes were small for the price.",
            orderRating=4,
            restaurantRating=3,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=2,
            userId=3,
            orderId=8,
            review="It was an average meal. Nothing special, but it satisfied my hunger.",
            orderRating=3,
            restaurantRating=3,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=2,
            userId=4,
            orderId=9,
            review="The food tasted good, but the portion size was smaller than expected.",
            orderRating=3,
            restaurantRating=4,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=2,
            userId=5,
            orderId=10,
            review="I enjoyed the food, but I had to wait much longer than expected.",
            orderRating=4,
            restaurantRating=4,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=3,
            userId=1,
            orderId=11,
            review="Dessert was amazing! I couldn’t stop eating it.",
            orderRating=5,
            restaurantRating=5,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=3,
            userId=2,
            orderId=12,
            review="The dessert was good, but a bit too sweet for my liking.",
            orderRating=4,
            restaurantRating=5,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=3,
            userId=3,
            orderId=13,
            review="Desserts were delicious, but the service could have been a bit faster.",
            orderRating=4,
            restaurantRating=5,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=3,
            userId=4,
            orderId=14,
            review="The dessert was perfect. Sweet but not overwhelming. Will definitely return!",
            orderRating=5,
            restaurantRating=5,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=3,
            userId=5,
            orderId=15,
            review="Desserts were alright, but I expected more variety on the menu.",
            orderRating=3,
            restaurantRating=5,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=4,
            userId=1,
            orderId=16,
            review="The meal was delicious, but I had a long wait for my food.",
            orderRating=4,
            restaurantRating=4,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=4,
            userId=2,
            orderId=17,
            review="Great food, quick service, but the atmosphere could be better.",
            orderRating=4,
            restaurantRating=4,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=4,
            userId=3,
            orderId=18,
            review="Service was quick, but the food was bland and lacked seasoning.",
            orderRating=2,
            restaurantRating=3,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=4,
            userId=4,
            orderId=19,
            review="Delicious food, excellent ambiance, but I wish there was a vegetarian option.",
            orderRating=4,
            restaurantRating=5,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=4,
            userId=5,
            orderId=20,
            review="Food was good, but the prices were higher than I expected.",
            orderRating=3,
            restaurantRating=4,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=5,
            userId=1,
            orderId=21,
            review="The food arrived on time, but I was disappointed with the taste.",
            orderRating=2,
            restaurantRating=3,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=5,
            userId=2,
            orderId=22,
            review="It was an average meal. The food was okay, but it didn’t wow me.",
            orderRating=3,
            restaurantRating=3,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=5,
            userId=3,
            orderId=23,
            review="The food was decent, but the delivery time was longer than expected.",
            orderRating=3,
            restaurantRating=3,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=5,
            userId=4,
            orderId=24,
            review="It was a great experience. The food was tasty and the service was prompt.",
            orderRating=5,
            restaurantRating=4,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=5,
            userId=5,
            orderId=25,
            review="I was happy with the meal, but it was a little too greasy for my taste.",
            orderRating=3,
            restaurantRating=3,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=6,
            userId=1,
            orderId=26,
            review="Dessert was absolutely amazing. Best I’ve had in a long time!",
            orderRating=5,
            restaurantRating=5,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=6,
            userId=2,
            orderId=27,
            review="I loved the dessert, but the portion size was a bit too small.",
            orderRating=4,
            restaurantRating=5,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=6,
            userId=3,
            orderId=28,
            review="Amazing desserts, but I had to wait too long to get my order.",
            orderRating=4,
            restaurantRating=5,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=6,
            userId=4,
            orderId=29,
            review="The dessert was rich in flavor and texture, I would definitely recommend it!",
            orderRating=5,
            restaurantRating=5,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            restaurantId=6,
            userId=5,
            orderId=30,
            review="The dessert was good, but I was expecting more variety in the options.",
            orderRating=3,
            restaurantRating=5,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
    ]

    db.session.bulk_save_objects(reviews)
    db.session.commit()


def undo_reviews():
    db.session.execute("DELETE FROM reviews;")
    db.session.commit()
