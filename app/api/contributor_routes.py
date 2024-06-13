from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from ..models import db, space_contributors

contributor_routes = Blueprint('contributors', __name__)

# Get all contributors
# @login_required