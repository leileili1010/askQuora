from flask import Blueprint
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Topic, Answer, Question, db


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
def get_topic_answers(topic_id):
    topic = Topic.query.get(topic_id)
    if not topic:
        return {"errors": {"message": "Topic not found"}}, 404

    if topic.answers:
        return [answer.to_dict() for answer in topic.answers]
    else:
        return []
    
# Get a topic with all its questions
@login_required
@topic_routes.route('/<int:topic_id>/questions')
def get_topic(topic_id): 
    topic = Topic.query.get(topic_id)
    if not topic:
        return {"errors": {"message": "Topic not found"}}, 404

    topic_dict = topic.to_dict()

    topic_dict["questions"] = [question.to_dict() for question in topic.questions]

    return topic_dict
    
    
# Get answers for all topics
@login_required
@topic_routes.route('/answers')
def get_all_answers():
    answers = Answer.query.order_by(Answer.updated_at.desc()).all()

    if not answers:
        return []
    else:
        return [answer.to_dict() for answer in answers]
    
# get all topics with corresponding questions attached to it
@login_required
@topic_routes.route('/topics-questions')
def get_topics_answers(): 
    topics = Topic.query.all()
    if not topics:
        return []
    else: 
      topics_dict = {}

      for topic in topics:
          topics_dict[topic.id] = topic.to_dict()
          topics_dict[topic.id]["questions"] = [question.to_dict() for question in topic.questions]
     
    return topics_dict

