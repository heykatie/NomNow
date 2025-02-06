from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Orders(db.Model):
    __tablename__ = "orders"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    item_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("menuitems.id")), nullable=False
    )
    quantity = db.Column(db.Integer, nullable=False, default=1)
    promo = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())  # onupdate=datetime.datetime.now()

    user = db.relationship("User", back_populates="orders")
    item = db.relationship("MenuItem", back_populates="orders")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "item_id": self.item_id,
            "quantity": self.quantity,
            "promo": self.promo,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
