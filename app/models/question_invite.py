from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from datetime import datetime

class QuestionInvite(db.Model):
    __tablename__ = 'question_invites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    receiver_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    question_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("questions.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    receiver = db.relationship('User', back_populates = 'invites')
    question = db.relationship('Question', back_populates = 'invites')

    def to_dict(self):
        return {
            'id': self.id,
            'receiver': self.receiver.to_dict(),
            'question': self.question.to_dict(),
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }