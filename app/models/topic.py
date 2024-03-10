from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from datetime import datetime
from .space_contributors import space_contributors

class Topic(db.Model):
    __tablename__ = 'topics'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    description = db.Column(db.String(255), nullable=False)
    creator_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    cover_img = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    creator = db.relationship('User', back_populates = 'topics')
    questions = db.relationship('Question', back_populates = 'topic', cascade = 'all, delete-orphan')
    answers = db.relationship('Answer', back_populates = 'topic', cascade = 'all, delete-orphan')
    contributors = db.relationship('User', secondary=space_contributors,  back_populates = 'spaces')
    subscriptions = db.relationship('Subscription', back_populates = 'topic', cascade = 'all, delete-orphan')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'creator': self.creator.to_dict(),
            'cover_img': self.cover_img,
            'num_of_subscriptions': len(self.subscriptions),
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
