from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models.db import db
from app.models import Order, OrderItem, MenuItem, User

order_routes = Blueprint("orders", __name__)


# Get all orders for the current user
@order_routes.route("/")
@login_required
def get_orders():
    orders = Order.query.filter_by(user_id=current_user.id).all()
    if not orders:
        return {"message": "No orders found"}, 404

    return jsonify({"orders": [order.to_dict() for order in orders]}), 200


# Get details of a specific order
@order_routes.route("/<int:order_id>")
@login_required
def get_order(order_id):
    order = Order.query.get(order_id)
    if not order:
        return {"message": "Order not found"}, 404
    if order.user_id != current_user.id:
        return {"message": "Unauthorized"}, 403

    return jsonify(order.to_dict()), 200


# Get all orders for the current user at a specific restaurant
@order_routes.route("/restaurant/<int:restaurant_id>")
@login_required
def get_orders_by_restaurant(restaurant_id):
    orders = Order.query.filter_by(
        user_id=current_user.id, restaurant_id=restaurant_id
    ).all()

    if not orders:
        return {"message": "No orders found for this restaurant."}, 404

    return jsonify({"orders": [order.to_dict() for order in orders]}), 200

# Create a new order with multiple menu items
@order_routes.route("/", methods=["POST"])
@login_required
def create_order():
    data = request.get_json()
    items = data.get(
        "items"
    )  # Expected format: [{"menuitem_id": 1, "quantity": 2}, {...}]
    promo = data.get("promo", None)

    if not items or not isinstance(items, list):
        return {
            "message": "Invalid request. 'items' must be a list of menu items."
        }, 400

    total_cost = 0
    order_items = []

    # Validate menu items and calculate total cost
    for item in items:
        menuitem_id = item.get("menuitem_id")
        quantity = item.get("quantity", 1)

        menu_item = MenuItem.query.get(menuitem_id)
        if not menu_item:
            return {"message": f"Menu item with ID {menuitem_id} not found"}, 404

        total_cost += menu_item.price * quantity

        order_items.append(
            OrderItem(menuitem_id=menuitem_id, quantity=quantity, price=menu_item.price)
        )

    # Create order
    new_order = Order(
        user_id=current_user.id,
        restaurant_id=menu_item.restaurantId,
        total_cost=total_cost,
        promo=promo,
    )
    db.session.add(new_order)
    db.session.flush()

    # Add items to order
    for order_item in order_items:
        order_item.order_id = new_order.id
        db.session.add(order_item)

    db.session.commit()

    return jsonify(new_order.to_dict()), 201

# Update an existing order's status or promo
@order_routes.route("/<int:order_id>", methods=["PUT"])
@login_required
def update_order(order_id):
    order = Order.query.get(order_id)
    if not order:
        return {"message": "Order not found"}, 404
    if order.user_id != current_user.id:
        return {"message": "Unauthorized"}, 403

    data = request.get_json()
    order.status = data.get("status", order.status)
    order.promo = data.get("promo", order.promo)

    db.session.commit()

    return jsonify(order.to_dict()), 200


# @order_routes.route("/<int:order_id>", methods=["DELETE"])
# @login_required
# def delete_order(order_id):
#     """
#     Delete an order.
#     """
#     order = Order.query.get(order_id)
#     if not order:
#         return {"message": "Order not found"}, 404
#     if order.user_id != current_user.id:
#         return {"message": "Unauthorized"}, 403

#     # Delete all associated order items first
#     OrderItem.query.filter_by(order_id=order.id).delete()
#     db.session.delete(order)
#     db.session.commit()

#     return {"message": "Successfully deleted order"}, 200
