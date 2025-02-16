from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    if email:
        user = User.query.filter(User.email == email).first()
        if not user:
            raise ValidationError('Email provided not found.')

def phone_exists(form, field):
    # Checking if user exists
    phone_number = field.data
    if phone_number:
        user = User.query.filter(User.phone_number == phone_number).first()
        if not user:
            raise ValidationError("Phone number provided not found.")


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    if form.data['email']:
        target = form.data['email']
        user = User.query.filter(User.email == target).first()
    elif form.data['phone_number']:
        target = form.data['phone_number']
        user = User.query.filter(User.phone_number == target).first()
    print('\n TARGET: ', target)
    print('PASSWORD: ', password)
    print('USER', user, '\n')
    
    print('USER PASSWORD: ',user.password, '\n')
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[user_exists])
    phone_number = StringField("phone Number", validators=[phone_exists])
    password = PasswordField('password', validators=[DataRequired(), password_matches])