from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import db, Question, Topic, Answer
from ..forms import QuestionForm

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
@question_routes.route('/topics/<int:topic_id>')
def get_topic_questions(topic_id):
    topic = Topic.query.get(topic_id)
    if not topic:
        return {"errors": {"message": "Topic not found"}}, 404
    questions = topic.questions
    if not questions:
        return []
    else: 
        return [question.to_dict() for question in questions]

# Get questions posted by current user   
@login_required
@question_routes.route('/posted-questions')
def get_user_questions():
    questions = current_user.questions
    if questions:
        return [question.to_dict() for question in questions]
    else:
        return []
    
# Get question by id   
@login_required
@question_routes.route('/<int:question_id>')
def get_question(question_id):
    question = Question.query.get(question_id)
    if question:
        return question.to_dict()
    else:
        return {"errors": {"message": "Question not found"}}, 404
    
# Create a new question
@login_required    
@question_routes.route('/new', methods=["POST"])
def new_question(): 
    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        new_question = Question(
            title = form.data["title"],
            topic_id = form.data["topic_id"],
            owner_id = current_user.id,
        )

        db.session.add(new_question)
        db.session.commit()
        return new_question.to_dict()
    return form.errors, 401

# Delete a question
@login_required 
@question_routes.route('/<int:question_id>/delete', methods=["DELETE"])
def delete_question(question_id):
    question = Question.query.get(question_id)
    
    if not question:
        return {"errors": {"message": "Question not found"}}, 404
    
    if current_user.id is not question.owner_id:
        return {'errors': {'message': "Unauthorized"}}, 401
    
    db.session.delete(question)
    db.session.commit()
    return {"message": "Successfully deleted question"}

# Edit a question
@login_required 
@question_routes.route('/<int:question_id>/edit', methods=["PUT"])
def Edit_question(question_id):
    question = Question.query.get(question_id)
    
    if not question:
        return {"errors": {"message": "Question not found"}}, 404
    
    if current_user.id is not question.owner_id:
        return {'errors': {'message': "Unauthorized"}}, 401
    
    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        question.title = form.data["title"] or question.title
        
        db.session.commit()
        return question.to_dict()
    return form.errors, 401

# Get all answers for a question
@login_required
@question_routes.route('/<int:question_id>/answers')
def get_question_answers(question_id):
    question = Question.query.get(question_id)
    if not question:
        return {"errors": {"message": "Question not found"}}, 404
    
    answers = question.answers
    if not answers:
        return []
    else:
        return [answer.to_dict() for answer in answers]

# Get all answers by author
@login_required
@question_routes.route('/currrent/answers')
def get_author_answers():
    user = current_user
    answers = user.answers
    
    if not answers:
        return []
    else:
        return [answer.to_dict() for answer in answers]