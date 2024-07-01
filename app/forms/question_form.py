from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired

class QuestionForm(FlaskForm):
    title = TextAreaField("Question Title", validators=[DataRequired()])
    topic_id = IntegerField("Topic ID")
   
   