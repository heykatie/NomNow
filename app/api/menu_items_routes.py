from flask import Blueprint, request
from ..models.menu_items import MenuItem
from ..models import db
from ..forms.menu_item_form import MenuItemForm
from flask_login import login_required
import datetime
import json
from ..utils import convert_camel_to_snake

menu_item_routes = Blueprint('menu_items', __name__)

### Get menu item: GET /api/menu-items/:menu_item_id
@menu_item_routes.route('/<int:id>', methods=['GET'])
def get_menu_item(id):
    """
    Gets the details of a menu item
    """
    menu_item = MenuItem.query.get(id)

    # if menu_item.id:
    return menu_item.to_dict()
    # else:
        # return { "error": "Menu item couldn't be found" }, 404


### Update menu item: PUT /api/menu-items/:menu_item_id/update
@menu_item_routes.route("/<int:id>/update", methods=["PUT"])
@login_required
def update_menu_item(id):
    """
    Updates a menu item
    """
    form = MenuItemForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    # Convert request JSON from camelCase to snake_case
    converted_data = convert_camel_to_snake(request.get_json())

    if form.validate_on_submit():
        item_to_update = MenuItem.query.get(id)

        item_to_update.name = converted_data["name"]
        item_to_update.food_type = converted_data["food_type"]
        item_to_update.description = converted_data["description"]
        item_to_update.price = converted_data["price"]
        item_to_update.food_image = converted_data["food_image"]
        item_to_update.updated_at = datetime.datetime.now()

        db.session.commit()
        return item_to_update.to_dict()  # Returns camelCase response

    if form.errors:
        return {"errors": form.errors}, 400


### Delete menu item: DELETE /api/menu-items/:menu_item_id/delete
@menu_item_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_menu_item(id):
    """
    Deletes a menu item
    """
    item_to_delete = MenuItem.query.get(id)
    db.session.delete(item_to_delete)
    db.session.commit()
    item_to_delete = MenuItem.query.get(id)
    if item_to_delete == None:
        res = {
        "message": "Successfully deleted menu item",
        "id": id
        }
        return res
