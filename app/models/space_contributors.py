from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey

space_contributors = db.Table(
    "space_contributors",
    db.Column(
        "contributor_id", 
        db.Integer, 
        db.ForeignKey(add_prefix_for_prod("users.id")), 
        primary_key=True
    ),
    db.Column(
        "space_id", 
        db.Integer, 
        db.ForeignKey(add_prefix_for_prod("topics.id")), 
        primary_key=True
    )
)

if environment == "production":
    space_contributors.schema = SCHEMA

   
def seed_space_contributors():
    contributions = [
        {'contributor_id': 1, 'space_id': 1},
        {'contributor_id': 2, 'space_id': 1},
        {'contributor_id': 3, 'space_id': 1},
        {'contributor_id': 4, 'space_id': 1},
        {'contributor_id': 5, 'space_id': 1},
        {'contributor_id': 10, 'space_id': 2},
        {'contributor_id': 6, 'space_id': 2},
        {'contributor_id': 2, 'space_id': 2},
        {'contributor_id': 1, 'space_id': 2},
        {'contributor_id': 5, 'space_id': 2},
        {'contributor_id': 8, 'space_id': 2},
        {'contributor_id': 4, 'space_id': 2},
        {'contributor_id': 7, 'space_id': 3},
        {'contributor_id': 10, 'space_id': 3},
        {'contributor_id': 9, 'space_id': 3},
        {'contributor_id': 6, 'space_id': 3},
        {'contributor_id': 3, 'space_id': 3},
        {'contributor_id': 4, 'space_id': 3},
        {'contributor_id': 2, 'space_id': 3},
        {'contributor_id': 3, 'space_id': 4},
        {'contributor_id': 5, 'space_id': 4},
        {'contributor_id': 8, 'space_id': 4},
        {'contributor_id': 4, 'space_id': 4},
        {'contributor_id': 2, 'space_id': 4},
        {'contributor_id': 6, 'space_id': 4},
        {'contributor_id': 9, 'space_id': 4},
        {'contributor_id': 9, 'space_id': 5},
        {'contributor_id': 7, 'space_id': 5},
        {'contributor_id': 1, 'space_id': 5},
        {'contributor_id': 3, 'space_id': 5},
        {'contributor_id': 5, 'space_id': 5},
        {'contributor_id': 6, 'space_id': 5},
        {'contributor_id': 2, 'space_id': 5},
        {'contributor_id': 4, 'space_id': 5},
        {'contributor_id': 8, 'space_id': 6},
        {'contributor_id': 4, 'space_id': 6},
        {'contributor_id': 1, 'space_id': 6},
        {'contributor_id': 6, 'space_id': 6},
        {'contributor_id': 3, 'space_id': 6},
        {'contributor_id': 5, 'space_id': 6},
        {'contributor_id': 4, 'space_id': 7},
        {'contributor_id': 6, 'space_id': 7},
        {'contributor_id': 5, 'space_id': 7},
        {'contributor_id': 2, 'space_id': 7},
        {'contributor_id': 8, 'space_id': 7},
        {'contributor_id': 9, 'space_id': 7},
        {'contributor_id': 10, 'space_id': 7},
        {'contributor_id': 7, 'space_id': 7},
        {'contributor_id': 1, 'space_id': 8},
        {'contributor_id': 4, 'space_id': 8},
        {'contributor_id': 10, 'space_id': 8},
        {'contributor_id': 5, 'space_id': 8},
        {'contributor_id': 7, 'space_id': 8},
        {'contributor_id': 3, 'space_id': 8},
        {'contributor_id': 10, 'space_id': 9},
        {'contributor_id': 8, 'space_id': 9},
        {'contributor_id': 7, 'space_id': 9},
        {'contributor_id': 4, 'space_id': 9},
        {'contributor_id': 1, 'space_id': 9},
        {'contributor_id': 3, 'space_id': 9},
        {'contributor_id': 6, 'space_id': 9},
        {'contributor_id': 2, 'space_id': 9},
        {'contributor_id': 2, 'space_id': 10},
        {'contributor_id': 1, 'space_id': 10},
        {'contributor_id': 4, 'space_id': 10},
        {'contributor_id': 3, 'space_id': 10},
        {'contributor_id': 8, 'space_id': 10},
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