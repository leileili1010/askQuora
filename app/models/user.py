from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .space_contributors import space_contributors

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_img = db.Column(db.String)
    position = db.Column(db.String(50))
    field = db.Column(db.String(50))
    years_of_experience = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    topics = db.relationship('Topic', back_populates = 'creator', cascade = 'all, delete-orphan')
    questions = db.relationship('Question', back_populates = 'owner', cascade = 'all, delete-orphan')
    answers = db.relationship('Answer', back_populates = 'author', cascade = 'all, delete-orphan')
    comments = db.relationship('Comment', back_populates = 'author', cascade = 'all, delete-orphan')
    spaces = db.relationship('Topic', secondary=space_contributors,  back_populates = 'contributors')
    invites = db.relationship('QuestionInvite', back_populates = 'receiver', cascade = 'all, delete-orphan')
    subscriptions = db.relationship('Subscription', back_populates = 'user', cascade = 'all, delete-orphan')



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'profile_img': self.profile_img,
            'position': self.position,
            'field': self.field,
            'years_of_experience': self.years_of_experience,
            'num_of_subscriptions': len(self.subscriptions),
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
