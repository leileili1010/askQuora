from flask import Blueprint
from flask_login import current_user, login_required
from ..models import Question

question_routes = Blueprint('questions', __name__)

# get all questions
@login_required
@question_routes.route('/')
def all_questions():
    questions = Question.query.all()
    if questions:
        return [question.to_dict() for question in questions]
    else:
        return []

# get all questions under certain topic
@login_required
@question_routes.route('/<topic>')
def get_topic_questions(topic):
    questions = Question.query.all()
    if not questions:
        return []
    else: 
        questions_dict = [question.to_dict() for question in questions]
        return [question for question in questions_dict if question["topic"].lower() == topic.lower()]

# Get projects posted by current user   
@login_required
@question_routes.route('/posted-questions')
def get_user_questions():
    questions = Question.query.filter(current_user.id == Question.owner_id).all()
    if questions:
        return [question.to_dict() for question in questions]
    else:
        return []
    