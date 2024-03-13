from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired

class EditAnswerForm(FlaskForm):
    detail = TextAreaField("Answer Detail", validators=[DataRequired()])
    detail_firstImgUrl = TextAreaField("First Image URL")
    detail_text = TextAreaField("Answer Detail Text") 
   
