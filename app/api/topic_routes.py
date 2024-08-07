from flask import Blueprint, request, jsonify
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
# @login_required
# @topic_routes.route('/<int:topic_id>/answers')
# def get_topic_answers(topic_id):
#     topic = Topic.query.get(topic_id)
#     if not topic:
#         return {"errors": {"message": "Topic not found"}}, 404

#     if topic.answers:
#         return [answer.to_dict() for answer in topic.answers]
#     else:
#         return []

# Get all answers of a topic
@login_required
@topic_routes.route('/<string:topicName>/answers', methods=['GET'])
def get_limited_topic_answers(topicName):
    # print("🚀 ~ topicName:", topicName)
    
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 6, type=int)
    
    topic = Topic.query.filter_by(name=topicName).first()
    if not topic:
        return {"errors": {"message": "Topic not found!"}}, 404

    answers_paginated = Answer.query.filter_by(topic_id=topic.id).paginate(page=page, per_page=limit, error_out=False)
    if not answers_paginated.items:
        return jsonify([])

    return jsonify([answer.to_dict() for answer in answers_paginated.items])


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

