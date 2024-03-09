from flask import Blueprint
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Subscription, db

subscription_routes = Blueprint('subscriptions', __name__)

# get all suscription for a user
@login_required
@subscription_routes.route('/current')
def get_user_subscriptions():
    subscriptions = Subscription.query.filter(Subscription.user_id == current_user.id).all()
    if not subscriptions:
        return []
    else:
        return [subscription.to_dict() for subscription in subscriptions]
    
# delete a suscription for a user
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