# Import needed dependencies
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Restaurant, db, CuisineType
from app.forms.restaurant_form import RestaurantForm
from sqlalchemy.orm import joinedload
from datetime import datetime

restaurant_routes = Blueprint("restaurants", __name__)


# Get all restaurants with their menu items
@restaurant_routes.route("/")
def get_all_restaurants():
    restaurants = (
        Restaurant.query.options(joinedload(Restaurant.menu_items))
        .filter(Restaurant.menu_items.any())
        .all()
    )

    # Convert each restaurant to a dictionary
    restaurant_list = []
    for restaurant in restaurants:
        restaurant_list.append(restaurant.to_dict())

    # Return the list in a dictionary
    return {"restaurants": restaurant_list}


# Get the Restaurants owned by the current user
@restaurant_routes.route("/current")
@login_required
def get_current_user_restaurants():
    restaurants = Restaurant.query.filter(Restaurant.owner_id == current_user.id).all()
    restaurant_list = []
    for restaurant in restaurants:
        restaurant_dict = restaurant.to_dict()
        restaurant_list.append(restaurant_dict)

    # Return the list wrapped in a dictionary
    return {"restaurants": restaurant_list}


# Get Restaraunt By Id
@restaurant_routes.route("/<int:restaurant_id>")
def get_restaurant_by_id(restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)
    if not restaurant:
        return {"errors": ["Restaurant not found"]}, 404
    return {"restaurant": restaurant.to_dict()}


# STILL NEED ROUTE FOR FILTERING BY CUISINETYPE


# Create a New Restaurant
@restaurant_routes.route("/new", methods=["POST"])
@login_required
def create_restaurant():
    form = RestaurantForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        try:
            # Create new restaurant using form data
            restaurant_data = form.to_dict()
            new_restaurant = Restaurant(
                # **unpacks all the data automatically instead of writing it all out. name = form.name.data, address = form.addres....
                **restaurant_data,
                owner_id=current_user.id,
            )

            db.session.add(new_restaurant)
            db.session.commit()
            return {"restaurant": new_restaurant.to_dict()}

        except Exception as e:
            db.session.rollback()
            return {"errors": [str(e)]}, 400

    return {
        "errors": [error for field in form.errors for error in form.errors[field]]
    }, 400


# Update an existing restaurant
@restaurant_routes.route("/<int:restaurant_id>/update", methods=["PUT"])
@login_required
def update_restaurant(restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)

    if not restaurant:
        return {"errors": ["Restaurant not found"]}, 404

    # Verify owner is current user
    if restaurant.owner_id != current_user.id:
        return {"errors": ["Unauthorized"]}, 403

    form = RestaurantForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        try:
            # Update restaurant with form data
            restaurant_data = form.to_dict()
            for key, value in restaurant_data.items():
                setattr(restaurant, key, value)

            restaurant.updated_at = datetime.datetime.now()
            db.session.commit()
            return {"restaurant": restaurant.to_dict()}

        except Exception as e:
            db.session.rollback()
            return {"errors": [str(e)]}, 400

    return {
        "errors": [error for field in form.errors for error in form.errors[field]]
    }, 400


# Delete a restaurant
@restaurant_routes.route("/<int:restaurant_id>/delete", methods=["DELETE"])
@login_required
def delete_restaurant(restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)

    if not restaurant:
        return {"errors": ["Restaurant not found"]}, 404

    # Verify owner is current user
    if restaurant.owner_id != current_user.id:
        return {"errors": ["Unauthorized"]}, 403

    try:
        db.session.delete(restaurant)
        db.session.commit()
        return {"id": restaurant_id, "message": "Successfully deleted restaurant"}
    except Exception:
        db.session.rollback()
        return {"message": "Unable to delete"}, 400
