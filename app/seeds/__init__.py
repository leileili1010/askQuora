from flask.cli import AppGroup
from .users import seed_users, undo_users
from .topics import seed_topics, undo_topics
from .questions import seed_questions, undo_questions
from .answers import seed_answers, undo_answers
from .comments import seed_comments, undo_comments
from .question_invites import undo_question_invites
from app.models import seed_space_contributors, undo_space_contributors

from app.models.db import db, environment, SCHEMA
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_space_contributors()
        undo_question_invites()
        undo_comments()
        undo_answers()
        undo_questions()
        undo_topics()
        undo_users()
    seed_users()
    seed_topics()
    seed_questions()
    seed_answers()
    seed_comments()
    seed_space_contributors()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_space_contributors()
    undo_question_invites()
    undo_comments()
    undo_answers()
    undo_questions()
    undo_topics()
    undo_users()
    # Add other undo functions here
