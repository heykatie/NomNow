from flask import Blueprint, request, jsonify
from models import db, Review, User, Restaraunt
from datetime import datetime

reviews_bp = Blueprint('reviews', __name__)

# Create a new review
@reviews_bp.route('/reviews', methods=['POST'])
def create_review():
    data = request.get_json()

    # Validation (optional, add any other validation needed)
    if not data.get('restarauntId') or not data.get('userId') or not data.get('orderId'):
        return jsonify({"error": "Missing required fields"}), 400

    # Create the new review
    new_review = Review(
        restarauntId=data['restarauntId'],
        userId=data['userId'],
        orderId=data['orderId'],
        review=data.get('review'),
        orderRating=data['orderRating'],
        restarauntRating=data['restarauntRating'],
        createdAt=datetime.utcnow(),
        updatedAt=datetime.utcnow()
    )

    try:
        db.session.add(new_review)
        db.session.commit()
        return jsonify({"message": "Review created successfully", "review": new_review.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Get a review by its ID
@reviews_bp.route('/reviews/<int:id>', methods=['GET'])
def get_review(id):
    review = Review.query.get(id)
    if review:
        return jsonify({
            "id": review.id,
            "restarauntId": review.restarauntId,
            "userId": review.userId,
            "orderId": review.orderId,
            "review": review.review,
            "orderRating": review.orderRating,
            "restarauntRating": review.restarauntRating,
            "createdAt": review.createdAt,
            "updatedAt": review.updatedAt
        })
    else:
        return jsonify({"error": "Review not found"}), 404

# Update a review by its ID
@reviews_bp.route('/reviews/<int:id>', methods=['PUT'])
def update_review(id):
    data = request.get_json()

    review = Review.query.get(id)
    if not review:
        return jsonify({"error": "Review not found"}), 404

    # Update fields if provided
    if 'review' in data:
        review.review = data['review']
    if 'orderRating' in data:
        review.orderRating = data['orderRating']
    if 'restarauntRating' in data:
        review.restarauntRating = data['restarauntRating']

    review.updatedAt = datetime.utcnow()

    try:
        db.session.commit()
        return jsonify({"message": "Review updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Delete a review by its ID
@reviews_bp.route('/reviews/<int:id>', methods=['DELETE'])
def delete_review(id):
    review = Review.query.get(id)
    if not review:
        return jsonify({"error": "Review not found"}), 404

    try:
        db.session.delete(review)
        db.session.commit()
        return jsonify({"message": "Review deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Get all reviews for a specific restaurant
@reviews_bp.route('/reviews/restaurant/<int:restarauntId>', methods=['GET'])
def get_reviews_for_restaraunt(restarauntId):
    reviews = Review.query.filter_by(restarauntId=restarauntId).all()
    if reviews:
        return jsonify([{
            "id": review.id,
            "restarauntId": review.restarauntId,
            "userId": review.userId,
            "orderId": review.orderId,
            "review": review.review,
            "orderRating": review.orderRating,
            "restarauntRating": review.restarauntRating,
            "createdAt": review.createdAt,
            "updatedAt": review.updatedAt
        } for review in reviews]), 200
    else:
        return jsonify({"message": "No reviews found for this restaurant"}), 404
