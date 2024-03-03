from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired

class AnswerForm(FlaskForm):
    detail = TextAreaField("Answer Detail", validators=[DataRequired()])
    question_id = IntegerField("Question ID", validators=[DataRequired()])
    topic_id = IntegerField("Topic ID")
   