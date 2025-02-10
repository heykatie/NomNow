from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from models import db, Review, User, Restaurant
from datetime import datetime
from app.utils import convert_camel_to_snake

review_routes = Blueprint('reviews', __name__)

# Helper function for error responses
def error_response(message, status_code):
    return jsonify({"error": message}), status_code

# Helper function for success responses
def success_response(message, data=None, status_code=200):
    response = {"message": message}
    if data is not None:
        response["data"] = data
    return jsonify(response), status_code

# Create a new review (Only logged-in users can create a review)
@review_routes.route("/reviews", methods=["POST"])
@login_required
def create_review():
    data = convert_camel_to_snake(request.get_json())

    # Validation
    if not data.get("restaurant_id") or not data.get("order_id"):
        return jsonify({"error": "Missing required fields"}), 400

    # Check if the referenced restaurant exists
    restaurant = Restaurant.query.get(data["restaurant_id"])
    if not restaurant:
        return jsonify({"error": "Invalid restaurant ID"}), 400

    # Validate order_rating and restaurant_rating to be between 1 and 5
    if not (1 <= data["order_rating"] <= 5) or not (
        1 <= data["restaurant_rating"] <= 5
    ):
        return jsonify({"error": "Ratings must be between 1 and 5"}), 400

    # Create the new review
    new_review = Review(
        restaurant_id=data["restaurant_id"],
        user_id=current_user.id,
        order_id=data["order_id"],
        review=data.get("review"),
        order_rating=data["order_rating"],
        restaurant_rating=data["restaurant_rating"],
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )

    try:
        db.session.add(new_review)
        db.session.commit()
        return jsonify(
            {"message": "Review created successfully", "review_id": new_review.id}
        ), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Get a review by its ID
@review_routes.route('/reviews/<int:id>', methods=['GET'])
@login_required
def get_review(id):
    review = Review.query.get(id)
    if review:
        return success_response("Review retrieved successfully", review.to_dict())
    else:
        return error_response("Review not found", 404)

# Update a review by its ID (Only the owner of the review can update it)
@review_routes.route("/reviews/<int:id>", methods=["PUT"])
@login_required
def update_review(id):
    data = convert_camel_to_snake(request.get_json())

    review = Review.query.get(id)
    if not review:
        return jsonify({"error": "Review not found"}), 404

    # Ensure only the owner of the review can update it
    if review.user_id != current_user.id:
        return jsonify({"error": "You are not authorized to update this review"}), 403

    # Update fields if provided
    if "review" in data:
        review.review = data["review"]
    if "order_rating" in data:
        if not (1 <= data["order_rating"] <= 5):
            return jsonify({"error": "Order rating must be between 1 and 5"}), 400
        review.order_rating = data["order_rating"]
    if "restaurant_rating" in data:
        if not (1 <= data["restaurant_rating"] <= 5):
            return jsonify({"error": "Restaurant rating must be between 1 and 5"}), 400
        review.restaurant_rating = data["restaurant_rating"]

    review.updated_at = datetime.now()

    try:
        db.session.commit()
        return jsonify({"message": "Review updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Delete a review by its ID (Only the owner of the review can delete it)
@review_routes.route('/reviews/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    if not review:
        return error_response("Review not found", 404)

    # Ensure only the owner of the review can delete it
    if review.userId != current_user.id:
        return error_response("You are not authorized to delete this review", 403)

    try:
        db.session.delete(review)
        db.session.commit()
        return success_response("Review deleted successfully")
    except Exception as e:
        db.session.rollback()
        return error_response(str(e), 500)

# Get all reviews for a specific restaurant
@review_routes.route("/reviews/restaurant/<int:restaurant_id>", methods=["GET"])
@login_required
def get_reviews_for_restaurant(restaurant_id):
    reviews = Review.query.filter_by(
        restaurant_id=restaurant_id
    ).all()
    return jsonify(
        {
            "message": "Reviews retrieved successfully",
            "data": [review.to_dict() for review in reviews],
        }
    )