from app.models import db, Question, environment, SCHEMA
from sqlalchemy.sql import text
from .question_seeds import questions

def seed_questions():
    for question in questions:
        db.session.add(Question(
            title = question['title'],
            owner_id = question['owner_id'],
            topic_id =  question['topic_id'],
        ))
    db.session.commit()


def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))
        
    db.session.commit()