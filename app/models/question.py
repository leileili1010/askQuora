from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from datetime import datetime

class Question(db.Model):
    __tablename__ = 'questions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    owner_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    topic_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("topics.id")))
    cover_img = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
   
    owner = db.relationship('User', back_populates = 'questions')
    topic = db.relationship('Topic', back_populates = 'questions')
    answers = db.relationship('Answer', back_populates = 'question', cascade = 'all, delete-orphan')
    comments = db.relationship('Comment', back_populates = 'question', cascade = 'all, delete-orphan')
    
    def to_dict(self):
        if topic:
            topic = self.topic.to_dict()
        else:
            topic = self.topic

        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "owner": self.owner.to_dict(),
            "topic": topic,
            "cover_img": self.cover_img,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
