from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.Text, nullable=False)
    author_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    question_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("questions.id")))
    answer_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("answers.id")))
    parent = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    author = db.relationship('User', back_populates = 'comments')
    question = db.relationship('Question', back_populates = 'comments')
    answer = db.relationship('Answer', back_populates = 'comments')

    def to_dict(self):
        if question:
            question = self.question.to_dict()
        else:
            question = self.question

        if answer:
            answer = self.answer.to_dict()
        else:
            answer = self.answer

        return {
            'id': self.id,
            'comment': self.comment,
            'author': self.author.to_dict(),
            'question': question,
            'answer': answer,
            'parent': self.parent,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }