from .db import db, environment, SCHEMA
from sqlalchemy import ForeignKey

space_contributors = db.Table(
    "space_contributors",
    db.Column(
        "contributor_id", 
        db.Integer, 
        db.ForeignKey("users.id"), 
        primary_key=True
    ),
    db.Column(
        "space_id", 
        db.Integer, 
        db.ForeignKey("topics.id"), 
        primary_key=True
    )
)

if environment == "production":
    space_contributors.schema = SCHEMA

   
def seed_space_contributors():
    contributions = [
        {'contributor_id': 1, 'space_id': 1},
        {'contributor_id': 2, 'space_id': 1},
        {'contributor_id': 4, 'space_id': 2},
        {'contributor_id': 10, 'space_id': 2},
        {'contributor_id': 6, 'space_id': 2},
        {'contributor_id': 2, 'space_id': 2},
    ]

    for contribution in contributions:
        db.session.execute(
            space_contributors.insert().values(
                contributor_id=contribution['contributor_id'],
                space_id=contribution['space_id']
            )
        )
    db.session.commit()

def undo_space_contributors():
    if environment == "production":
        db.session.execute(f"DELETE FROM {SCHEMA}.space_contributors")
    else:
        db.session.execute("DELETE FROM space_contributors")
    db.session.commit()