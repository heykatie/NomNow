from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    restaurantId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('restaurants.id')), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    orderId = db.Column(db.Integer, nullable=False)
    review = db.Column(db.Text, nullable=True)
    orderRating = db.Column(db.Integer, nullable=False)
    u =db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


    user = db.relationship('User', back_populates='reviews')
    restaurant =db.relationship('Restaurant', back_populates='reviews')

    def to_dict(self):
        return {
            "id": self.id,
            "restaurantId": self.restaurantId,
            "userId": self.userId,
            "orderId": self.orderId,
            "review": self.review,
            "orderRating": self.orderRating,
            "restaurantRating": self.restaurantRating,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }
