from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import db, Answer
from ..forms import AnswerForm
from ..forms import EditAnswerForm

answer_routes = Blueprint('answers', __name__)

# create new answer
@login_required
@answer_routes.route('/new', methods=["POST"])
def create_answer():
    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        
        new_answer = Answer(
            detail = data['detail'],
            author_id = current_user.id,
            question_id = data['question_id'],
            topic_id = data['topic_id']
        )

        db.session.add(new_answer)
        db.session.commit()
        return new_answer.to_dict()
    return form.errors, 401
  
# edit new answer
@login_required
@answer_routes.route('/<int:answer_id>/edit', methods=["PUT"])
def edit_answer(answer_id):
    answer = Answer.query.get(answer_id)

    if not answer:
        return {"errors": {"message": "Answer not found"}}, 404
    
    if current_user.id is not answer.author_id:
        return {'errors': {'message': "Unauthorized"}}, 401

    form = EditAnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
      
        answer.detail = data['detail']
        
        db.session.commit()
        return answer.to_dict()
    return form.errors, 401



# delete answer
@login_required
@answer_routes.route('/<int:answer_id>/delete', methods=["DELETE"])
def delete_answer(answer_id):
    answer = Answer.query.get(answer_id)
    
    if not answer:
        return {"errors": {"message": "Answer not found"}}, 404
    
    if current_user.id is not answer.author_id:
        return {'errors': {'message': "Unauthorized"}}, 401
    
    db.session.delete(answer)
    db.session.commit()
    return {"message": "Successfully deleted answer"}

