from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from models import db, Review, User, Restaurant  
from datetime import datetime

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
@review_routes.route('/reviews', methods=['POST'])
@login_required
def create_review():
    data = request.get_json()

    # Validation (Check for missing required fields)
    if not data.get('restaurantId') or not data.get('orderId'):
        return error_response("Missing required fields", 400)

    # Check if the referenced restaurant exists
    restaurant = Restaurant.query.get(data['restaurantId'])
    if not restaurant:
        return error_response("Invalid restaurant ID", 400)

    # Validate orderRating and restaurantRating to be between 1 and 5
    if not (1 <= data['orderRating'] <= 5) or not (1 <= data['restaurantRating'] <= 5):
        return error_response("Ratings must be between 1 and 5", 400)

    # Create the new review with the logged-in user's ID
    new_review = Review(
        restaurantId=data['restaurantId'],
        userId=current_user.id,  # Ensuring only the logged-in user can create a review
        orderId=data['orderId'],
        review=data.get('review'),
        orderRating=data['orderRating'],
        restaurantRating=data['restaurantRating'],
        createdAt=datetime.utcnow(),
        updatedAt=datetime.utcnow()
    )

    try:
        db.session.add(new_review)
        db.session.commit()
        return success_response("Review created successfully", {"review_id": new_review.id}, 201)
    except Exception as e:
        db.session.rollback()
        return error_response(str(e), 500)

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
@review_routes.route('/reviews/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
    data = request.get_json()

    review = Review.query.get(id)
    if not review:
        return error_response("Review not found", 404)

    # Ensure only the owner of the review can update it
    if review.userId != current_user.id:
        return error_response("You are not authorized to update this review", 403)

    # Update fields if provided
    if 'review' in data:
        review.review = data['review']
    if 'orderRating' in data:
        if not (1 <= data['orderRating'] <= 5):
            return error_response("Order rating must be between 1 and 5", 400)
        review.orderRating = data['orderRating']
    if 'restaurantRating' in data:
        if not (1 <= data['restaurantRating'] <= 5):
            return error_response("Restaurant rating must be between 1 and 5", 400)
        review.restaurantRating = data['restaurantRating']

    review.updatedAt = datetime.utcnow()

    try:
        db.session.commit()
        return success_response("Review updated successfully")
    except Exception as e:
        db.session.rollback()
        return error_response(str(e), 500)

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
@review_routes.route('/reviews/restaurant/<int:restaurantId>', methods=['GET'])
@login_required
def get_reviews_for_restaurant(restaurantId):
    reviews = Review.query.filter_by(restaurantId=restaurantId).all()
    if reviews:
        return success_response("Reviews retrieved successfully", [review.to_dict() for review in reviews])
    else:
        return success_response("No reviews found for this restaurant", [])

