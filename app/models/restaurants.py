from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
from enum import Enum

class cuisineType(Enum):
    AMERICAN = 'American'
    CHINESE = 'Chinese'
    ITALIAN = 'Italian'
    JAPANESE = 'Japanese'
    MEXICAN = 'Mexican'
    INDIAN = 'Indian'
    THAI = 'Thai'
    MEDITERRANEAN = 'Mediterranean'
    KOREAN = 'Korean'
    VIETNAMESE = 'Vietnamese'
    GREEK = 'Greek'
    SPANISH = 'Spanish'
    SEAFOOD = 'Seafood'
    PIZZA = 'Pizza'
    VEGETARIAN = 'Vegetarian'
    VEGAN = 'Vegan'
    BREAKFAST = 'Breakfast'
    FAST_FOOD = 'Fast Food'
    CARIBBEAN = 'Caribbean'
    SOUL_FOOD = 'Soul Food'

class Restaurant(db.Model):
    __tablename__ = "restaurants"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    address = db.Column(db.String(255), nullable = False, )
    city = db.Column(db.String(255), nullable = False)
    state = db.Column(db.String(255), nullable = False)
    zip = db.Column(db.Integer, nullable = False)
    name = db.Column(db.String(255), nullable = False, unique=True)
    cuisineType = db.Column(db.Enum(cuisineType), nullable = False)
    deliveryFee = db.Column(db.Decimal)
    businessHours = db.Column( db.String(255), nullable = False)
    Servicing = db.Column(db.Boolean, nullable = False)
    storeImage = db.Column(db.String(255)) #URL 
    description = db.Column(db.Text, nullable = False)
    priceLevel = db.Column(db.Enum("$","$$","$$$","$$$$", name='priceLevel'), nullable = False)
    deliveryTime = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())  # onupdate=datetime.datetime.now()

# RELATIONSHIPS 
    owner = db.relationship('User', back_populates='restaurants')
    menu_items_rel = db.relationship('MenuItem', back_populates='restaurant')
    reviews = db.relationship('Review', back_populates='restaurant')
    orders = db.relationship('Order', back_populates='restaurant')
    
    def to_dict(self):
        return {
            "id": self.id,
            "ownerId": self.ownerId,
            "address": self.address,
            "city":self.city,
            "state":self.state,
            "zip": self.zip,
            "name": self.name,
            "cuisineType": self.cuisineType,
            "deliveryFee": self.deliveryFee,
            "businessHours": self.businessHours,
            "Servicing": self.Servicing,
            "storeImage": self.storeImage,
            "description": self.description,
            "priceLevel": self.priceLevel,
            "deliveryTime": self.deliveryTime,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
