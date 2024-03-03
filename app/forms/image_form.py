from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed, FileField, FileRequired
from wtforms.validators import DataRequired
from app.api.aws_helper import ALLOWED_EXTENSIONS


class ImageForm(FlaskForm):
    image = FileField('Image', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])