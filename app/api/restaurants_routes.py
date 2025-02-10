# Import needed dependencies
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Restaurant, db, CuisineType, PriceLevel
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

    if not form.validate_on_submit():
        print("Validation Errors:", form.errors)  # Debugging
        return {"errors": form.errors}, 400

    try:
        # Convert Enums correctly
        form.cuisine_type.data = CuisineType[form.cuisine_type.data].name
        form.price_level.data = PriceLevel[form.price_level.data].name

        restaurant_data = {
            "name": form.name.data,
            "address": form.address.data,
            "city": form.city.data,
            "state": form.state.data,
            "zip": form.zip.data,
            "cuisine_type": form.cuisine_type.data,
            "delivery_fee": form.delivery_fee.data,
            "business_hours": form.business_hours.data,
            "servicing": form.servicing.data,
            "description": form.description.data,
            "price_level": form.price_level.data,
            "delivery_time": form.delivery_time.data,
            "owner_id": current_user.id,
        }

        new_restaurant = Restaurant(**restaurant_data)

        db.session.add(new_restaurant)
        db.session.commit()
        return {"restaurant": new_restaurant.to_dict()}, 201

    except KeyError as e:
        return {"errors": [f"Invalid choice: {str(e)}"]}, 400
    except Exception as e:
        db.session.rollback()
        return {"errors": [str(e)]}, 400


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
