from app.models import db, Topic, environment, SCHEMA
from sqlalchemy.sql import text
from .topic_seeds import topics

def seed_topics():
    for topic in topics:
        db.session.add(Topic(
            name = topic['name'],
            description = topic['description'],  
            creator_id = topic['creator_id'], 
            cover_img = topic['cover_img'] 
        ))
    db.session.commit()


def undo_topics():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.topics RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM topics"))
        
    db.session.commit()