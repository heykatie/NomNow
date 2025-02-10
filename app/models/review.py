from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("restaurants.id")), nullable=False
    )
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    order_id = db.Column(db.Integer, nullable=False)
    review = db.Column(db.Text, nullable=True)
    order_rating = db.Column(db.Integer, nullable=False)
    restaurant_rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    users = db.relationship("User", back_populates="reviews")
    restaurants = db.relationship("Restaurant", back_populates="reviews")

    def to_dict(self):
        return {
            "id": self.id,
            "restaurant_id": self.restaurant_id,
            "user_id": self.user_id,
            "order_id": self.order_id,
            "review": self.review,
            "order_rating": self.order_rating,
            "restaurant_rating": self.restaurant_rating,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
