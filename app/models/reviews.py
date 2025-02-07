from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone

db = SQLAlchemy()

class Review(db.Model):
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    restarauntId = db.Column(db.Integer, db.ForeignKey('restaraunts.id'), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    orderId = db.Column(db.Integer, nullable=False)
    review = db.Column(db.Text, nullable=True)
    orderRating = db.Column(db.Integer, nullable=False)
    restarauntRating = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updatedAt = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    
    user = db.relationship('User', back_populates='reviews')
    restaraunt = db.relationship('Restaraunt', back_populates='reviews')
