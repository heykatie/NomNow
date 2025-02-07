from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
import enum

class MenuItemEnum(enum.Enum):
    appetizer = "appetizer"
    entree = "entree"
    dessert = "dessert"
    beverage = "beverage"

    @staticmethod
    def to_list():
        return [item.value for item in MenuItemEnum]
    
class MenuItem(db.Model):
    __tablename__ = 'menu_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    restaurantId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('restaurants.id')), nullable=False)
    name = db.Column(db.String, nullable=False)
    foodType = db.Column(db.Enum(MenuItemEnum), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    foodImage = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)

    # one-to-many: one restaurant can have many menu_items
    restaurants_rel = db.relationship("Restaurant", back_populates="menu_items_rel")
    # one-to-many: one order can have many menu_items
    order_rel = db.relationship("Order", back_populates="menu_items_rel")


    def to_dict(self):
        return {
            "id": self.id,
            "restaurantId": self.restaurantId,
            "name": self.name,
            "foodType": self.foodType,
            "description": self.description,
            "price": self.price,
            "foodImage": self.foodImage,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt
        }