from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from .comment_seeds import comments

def seed_comments():
    for comment in comments:
        db.session.add(Comment(
            comment = comment['comment'],
            author_id = comment['author_id'],
            # question_id =  comment['question_id'],
            answer_id =  comment['answer_id'],
            # parent =  comment['parent'],
        ))
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
        
    db.session.commit()