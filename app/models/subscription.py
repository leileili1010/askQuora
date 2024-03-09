from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from datetime import datetime

class Subscription(db.Model) :
    __tablename__ = 'subscriptions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    topic_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("topics.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship('User', back_populates = 'subscriptions')
    topic = db.relationship('Topic', back_populates = 'subscriptions')

    def to_dict(self):
        return {
            'id': self.id,
            'topic': self.topic.to_dict(),
            'user': self.user.to_dict(),
        }
    