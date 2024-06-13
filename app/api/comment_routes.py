from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from ..models import db, Comment

comment_routes = Blueprint('comments', __name__)

# add a comment
@login_required
@comment_routes.route('/<int:answerId>', methods=["POST"])
def create_comment(answerId):

    data = request.json

    if 'comment' in data: 
        comment = data['comment'] 
    else: 
        comment =  data['reply']

    if 'parentId' in data:
        parent = data['parentId']
    else:
        parent = None

    new_comment = Comment(
        comment = comment,
        answer_id = answerId,
        author_id = current_user.id,
        parent = parent
    )
    try:
        db.session.add(new_comment)
        db.session.commit()
    except:
        return {"errors": {
            "message": "Comment required"
        }}

    return new_comment.to_dict()


def build_nested_comments(comments_dict, parent_id=None):
    nested_comments = []
    for comment_id, comment in comments_dict.items():
        if comment['parent'] == parent_id:
            # Recursive call to find replies to this comment
            comment['replies'] = build_nested_comments(comments_dict, comment_id)
            nested_comments.append(comment)
    return nested_comments

@login_required
@comment_routes.route('/comments/<int:answerId>')
def get_comments(answerId):
    comments = Comment.query.filter(Comment.answer_id == answerId).all()
    comments_dict = {comment.id: comment.to_dict() for comment in comments}

    nested_comments = build_nested_comments(comments_dict)

    return nested_comments