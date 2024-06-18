from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from ..models import db, Comment

comment_routes = Blueprint('comments', __name__)

# delete comment and its nested comments
def delete_nested_comments(comment):
    replies = Comment.query.filter_by(parent=comment.id).all()
    for reply in replies:
        delete_nested_comments(reply)
    
    db.session.delete(comment)
    db.session.commit()

@login_required
@comment_routes.route('/<int:commentId>/delete', methods=["DELETE"])
def delete_comment(commentId):
    comment = Comment.query.get(commentId)

    if not comment:
        return jsonify({'errors': {'message': "Comment not found"}}), 404
    
    if current_user.id is not comment.author_id:
        return jsonify({'errors': {'message': "Unauthorized"}}), 401
    
    delete_nested_comments(comment)

    return jsonify({"message": f"Successfully deleted comment"})