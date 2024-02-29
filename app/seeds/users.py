from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from .user_seeds import users


# Adds a demo user, you can add other users here if you want
def seed_users():
    for user in users:
        db.session.add(User(
            username = user['username'], 
            first_name = user["first_name"], 
            last_name = user['last_name'],
            email = user['email'], 
            password = user['password'],
            profile_img = user["profile_img"],
            position = user["position"],
            field = user["field"],
            years_of_experience = user["years_of_experience"],
        ))
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
