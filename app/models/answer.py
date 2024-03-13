from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from datetime import datetime

class Answer(db.Model):
    __tablename__ = 'answers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    detail = db.Column(db.Text, nullable=False)
    detail_text = db.Column(db.Text)
    detail_firstImgUrl = db.Column(db.Text)
    author_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    question_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("questions.id")), nullable=False)
    topic_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("topics.id")))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
   
    author = db.relationship('User', back_populates = 'answers')
    question = db.relationship('Question', back_populates = 'answers')
    topic = db.relationship('Topic', back_populates = 'answers')
    comments = db.relationship('Comment', back_populates = 'answer', cascade = 'all, delete-orphan')
    
    
    def to_dict(self):
        if self.topic:
            topic = self.topic.to_dict()
        else:
            topic = self.topic

        return {
            "id": self.id,
            "detail": self.detail,
            "detail_text": self.detail_text,
            "detail_firstImgUrl": self.detail_firstImgUrl,
            "author": self.author.to_dict(),
            "question": self.question.to_dict(),
            "topic": topic,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }