from flask_wtf import FlaskForm
from wtforms import SelectField, StringField, FloatField, TextAreaField
from wtforms.validators import DataRequired, Length, URL


item_types = ["appetizer", "entree", "dessert", "beverage"]

class MenuItemForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    foodType = SelectField("FoodType", choices=item_types, validators=[DataRequired()])
    description = TextAreaField("Description")
    price = FloatField("Price", validators=[DataRequired()])
    foodImage = StringField("FoodImage URL", validators=[DataRequired(), URL(), Length(min=1, max=255)])
