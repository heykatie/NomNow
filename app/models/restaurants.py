from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
from enum import Enum
from sqlalchemy import Numeric


class PriceLevel(Enum):
    INEXPENSIVE = "$"
    MODERATE = "$$"
    EXPENSIVE = "$$$"
    VERY_EXPENSIVE = "$$$$"


class CuisineType(Enum):
    AMERICAN = "American"
    CHINESE = "Chinese"
    ITALIAN = "Italian"
    JAPANESE = "Japanese"
    MEXICAN = "Mexican"
    INDIAN = "Indian"
    THAI = "Thai"
    MEDITERRANEAN = "Mediterranean"
    KOREAN = "Korean"
    VIETNAMESE = "Vietnamese"
    GREEK = "Greek"
    SPANISH = "Spanish"
    SEAFOOD = "Seafood"
    PIZZA = "Pizza"
    VEGETARIAN = "Vegetarian"
    VEGAN = "Vegan"
    BREAKFAST = "Breakfast"
    FAST_FOOD = "Fast Food"
    CARIBBEAN = "Caribbean"
    SOUL_FOOD = "Soul Food"


class Restaurant(db.Model):
    __tablename__ = "restaurants"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    address = db.Column(
        db.String(255),
        nullable=False,
    )
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    zip = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(255), nullable=False, unique=True)
    cuisine_type = db.Column(db.Enum(CuisineType), nullable=False)
    delivery_fee = db.Column(Numeric(10, 2))
    business_hours = db.Column(db.String(255), nullable=False)
    servicing = db.Column(db.Boolean, nullable=False)
    store_image = db.Column(db.String(255))  # URL
    description = db.Column(db.Text, nullable=False)
    price_level = db.Column(db.Enum(PriceLevel), nullable=False)
    delivery_time = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(
        db.DateTime, default=datetime.datetime.now(), 
    onupdate=datetime.datetime.now())

    # RELATIONSHIPS
    users = db.relationship("User", back_populates="restaurants")
    menu_items = db.relationship("MenuItem", back_populates="restaurants")
    reviews = db.relationship("Review", back_populates="restaurants")
    orders = db.relationship("Order", back_populates="restaurants")

    def to_dict(self):
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "zip": self.zip,
            "name": self.name,
            "cuisine_type": self.cuisine_type,
            "delivery_fee": self.delivery_fee,
            "business_hours": self.business_hours,
            "servicing": self.servicing,
            "store_image": self.store_image,
            "description": self.description,
            "price_level": self.price_level,
            "delivery_time": self.delivery_time,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
