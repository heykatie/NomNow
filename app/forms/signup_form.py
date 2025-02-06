from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


# // ==> LOOOOOOOOKKK

class SignUpForm(FlaskForm):
    firstName = StringField('firstName', validators=[DataRequired()])
    lastName = StringField('lastName', validators=[DataRequired()])
    phoneNumber = StringField('phoneNumber', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    zip = IntegerField('zip', validators=[DataRequired()])
