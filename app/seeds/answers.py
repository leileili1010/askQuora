from app.models import db, Answer, environment, SCHEMA
from sqlalchemy.sql import text
from .answer_seeds import answers

def seed_answers():
    for answer in answers:
        db.session.add(Answer(
            detail = answer['detail'],
            author_id = answer['author_id'],
            question_id =  answer['question_id'],
            topic_id =  answer['topic_id'],
            cover_img = answer['cover_img'] 
        ))
    db.session.commit()


def undo_answers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM answers"))
        
    db.session.commit()