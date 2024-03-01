from flask import Blueprint
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Topic, Answer, db


topic_routes = Blueprint('topics', __name__)

# get all topics
@login_required
@topic_routes.route('/')
def all_topics():
    topics = Topic.query.all()
    if topics:
        return [topic.to_dict() for topic in topics]
    else:
        return []
    
# Get all answers of a topic
@login_required
@topic_routes.route('/<int:topic_id>/answers')
def get_author_answers(topic_id):
    topic = Topic.query.get(topic_id)
    if not topic:
        return {"errors": {"message": "Topic not found"}}, 404
    
    answers = Answer.query.filter(Answer.topic_id == topic_id).all()
    if not answers:
        return []
    else:
        return [answer.to_dict() for answer in answers]