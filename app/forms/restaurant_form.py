from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextAreaField, IntegerField, DecimalField, BooleanField, URLField
from wtforms.validators import DataRequired, Length, NumberRange, URL, Optional
from app.models.restaurants import cuisineType

class RestaurantForm(FlaskForm):
    name = StringField('Restaurant Name', 
        validators=[DataRequired(), Length(min=1, max=255)])
    
    address = StringField('Address', 
        validators=[DataRequired(message = "Street Adress is Required"), Length(max=255)])
    
    city = StringField('City', 
        validators=[DataRequired(message = "Select a City"), Length(max=255)])
    
    state = StringField('State', 
        validators=[DataRequired(message = "Please Select a cuisineType"), Length(max=255)])
    
    zip = IntegerField('ZIP Code', 
        validators=[DataRequired(), NumberRange(min=1, max=99999)])
    
    cuisineType = SelectField(
        'Cuisine Type',
        choices=[(cuisine.value, cuisine.value) for cuisine in cuisineType],
        validators=[DataRequired()]
    )
    
    deliveryFee = DecimalField('Delivery Fee', 
        validators=[Optional()],
        places=2)
    
    businessHours = StringField('Business Hours', 
        validators=[DataRequired(), Length(max=255)])
    
    Servicing = BooleanField('Currently Servicing',
        default=True)
    
    storeImage = URLField('Store Image URL',
        validators=[Optional(), URL()])
    
    description = TextAreaField('Description',
        validators=[DataRequired()])
    
    priceLevel = SelectField(
        'Price Level',
        choices=[
            ('$', '$'),
            ('$$', '$$'),
            ('$$$', '$$$'),
            ('$$$$', '$$$$')
        ],
        validators=[DataRequired()]
    )
    
    deliveryTime = IntegerField('Delivery Time (minutes)',
        validators=[Optional(), NumberRange(min=1)])

    def to_dict(self):
        return {
            'name': self.name.data,
            'address': self.address.data,
            'city': self.city.data,
            'state': self.state.data,
            'zip': self.zip.data,
            'cuisineType': self.cuisineType.data,
            'deliveryFee': float(self.deliveryFee.data) if self.deliveryFee.data else None,
            'businessHours': self.businessHours.data,
            'Servicing': self.Servicing.data,
            'storeImage': self.storeImage.data,
            'description': self.description.data,
            'priceLevel': self.priceLevel.data,
            'deliveryTime': self.deliveryTime.data
        }