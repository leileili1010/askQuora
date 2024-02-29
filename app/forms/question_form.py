from flask_wtf import FlaskForm
from wtforms import TextAreaField, URLField
from wtforms.validators import DataRequired

class QuestionForm(FlaskForm):
    title = TextAreaField("Question Title", validators=[DataRequired()])
    description = TextAreaField("Question Detail", validators=[DataRequired()])
    cover_image = URLField('Question Image')
   