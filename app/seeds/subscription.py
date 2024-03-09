from app.models import db, Subscription, environment, SCHEMA
from sqlalchemy.sql import text
from .subscription_seeds import subscriptions

def seed_subscriptions():
    for subscription in subscriptions:
        db.session.add(Subscription(
            user_id = subscription['user_id'],
            topic_id =  subscription['topic_id'],
        ))
    db.session.commit()


def undo_subscriptions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.subscriptions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM subscriptions"))
        
    db.session.commit()