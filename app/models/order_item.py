from .db import db, environment, SCHEMA, add_prefix_for_prod


class OrderItem(db.Model):
    __tablename__ = "orderitems"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    order_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("orders.id")), nullable=False
    )
    menuitem_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("menuitems.id")), nullable=False
    )
    quantity = db.Column(db.Integer, nullable=False, default=1)
    price = db.Column(
        db.Numeric(10, 2), nullable=False
    )  # Stores price at the time of purchase

    # order = db.relationship("Order", back_populates="order_items")
    # menuitem = db.relationship("MenuItem")

    def to_dict(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "menuitem_id": self.menuitem_id,
            "quantity": self.quantity,
            "price": float(self.price),
        }
