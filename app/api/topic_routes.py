from flask import Blueprint
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Topic, db


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
    
