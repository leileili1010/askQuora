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

    # chris.spaces.append(python)
    # chris.spaces.append(job_interview)
    # Annie.spaces.append(python)
    # Annie.spaces.append(job_interview)

    # db.session.commit()