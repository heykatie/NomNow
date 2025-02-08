from flask import Blueprint, request
from ..models.menu_items import MenuItem
from ..models import db
from ..forms.menu_item_form import MenuItemForm
from flask_login import login_required,current_user
from datetime import datetime
from flask import jsonify
from flask_cors import CORS

menu_item_routes = Blueprint('menu_items', __name__)

### Get menu item: GET /api/menu-items/:menu_item_id
@menu_item_routes.route('/<int:id>', methods=['GET'])
def get_menu_item(id):
    menu_item = MenuItem.query.get(id)

    if menu_item:
        return jsonify(menu_item.to_dict()), 200
    else:
        return jsonify({"error": "Menu item not found"}), 404
    


@menu_item_routes.route('/<int:id>', methods=['DELETE'])
def delete_menu_item(id):
    menu_item = MenuItem.query.get(id)

    if menu_item:
        try:
            db.session.delete(menu_item)
            db.session.commit()
            return jsonify({"message": "Menu item deleted successfully"}), 200
        except Exception as e:
            db.session.rollback()  # Rollback the transaction in case of error
            return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    else:
        return jsonify({"error": "Menu item not found"}), 404
