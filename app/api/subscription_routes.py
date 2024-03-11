from flask import Blueprint, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Subscription, db, Topic

subscription_routes = Blueprint('subscriptions', __name__)

# get all subscription for a user
@login_required
@subscription_routes.route('/current')
def get_user_subscriptions():
    subscriptions = current_user.subscriptions
    if not subscriptions:
        return []
    else:
        return [subscription.to_dict() for subscription in subscriptions]
    
# delete a subscription for a user
@login_required
@subscription_routes.route('/<int:subscription_Id>/delete', methods=["DELETE"])
def delete_user_subscription(subscription_Id):
    subscription = Subscription.query.get(subscription_Id)
    
    if not subscription:
        return {"errors": {"message": "Subscription not found"}}, 404
    
    if current_user.id is not subscription.user_id:
        return {'errors': {'message': "Unauthorized"}}, 401
    
    db.session.delete(subscription)
    db.session.commit()
    return {"message": "Successfully deleted answer"}

# add new subscription
@login_required
@subscription_routes.route('/new', methods=["POST"])
def add_user_subscription():
    topic_id = request.json.get('topic_id') 

    if not topic_id:
        return jsonify({'error': 'Topic ID is required'}), 400  # Bad Request

    topic = Topic.query.get(topic_id)
    if not topic:
        return jsonify({'error': 'Topic not found'}), 404  # Not Found

    new_subscription = Subscription(
        user_id = current_user.id,
        topic_id = topic_id
    )

    try:
        db.session.add(new_subscription)
        db.session.commit()
        return new_subscription.to_dict(), 201  # Created
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Error adding subscription', 'details': str(e)}), 500 
