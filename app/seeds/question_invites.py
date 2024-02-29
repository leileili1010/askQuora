from app.models import db, question_invite, environment, SCHEMA
from sqlalchemy.sql import text

# def seed_answers():
#     for answer in answers:
#         db.session.add(Answer(
#             detail = answer['detail'],
#             author_id = answer['author_id'],
#             question_id =  answer['question_id'],
#             topic_id =  answer['topic_id'],
#             # cover_img = answer['cover_img'] 
#         ))
#     db.session.commit()


def undo_question_invites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.question_invites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM question_invites"))
        
    db.session.commit()