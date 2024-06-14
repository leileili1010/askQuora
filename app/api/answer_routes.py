from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from ..models import db, Answer, Comment
from ..forms import AnswerForm
from ..forms import EditAnswerForm

answer_routes = Blueprint('answers', __name__)

# Get ansers for all topics with paginationa and limit
@login_required
@answer_routes.route('/', methods=['GET'])
def get_limited_answers():
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 6, type=int)
    answers = Answer.query.paginate(page=page, per_page=limit, error_out=False)
    if not answers.items:
        return []
    else:
        return jsonify([answer.to_dict() for answer in answers.items])
    

# Get answers for all topics
@login_required
@answer_routes.route('/')
def get_all_answers():
    answers = Answer.query.all()

    if not answers:
        return []
    else:
        return [answer.to_dict() for answer in answers]

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
            detail_text = data["detail_text"],
            detail_firstImgUrl = data["detail_firstImgUrl"],
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
        answer.detail_firstImgUrl = data['detail_firstImgUrl']
        answer.detail_text = data['detail_text']
        
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


# Get comments for an answer
def build_nested_comments(comments_dict, parent_id=None):
    nested_comments = []
    for comment_id, comment in comments_dict.items():
        if comment['parent'] == parent_id:
            # Recursive call to find replies to this comment
            comment['replies'] = build_nested_comments(comments_dict, comment_id)
            nested_comments.append(comment)
    return nested_comments

@login_required
@answer_routes.route('/<int:answer_id>/comments/get')
def get_comments(answer_id):
    answer = Answer.query.get(answer_id)
    if not answer:
        return {"errors": {"message": "Answer not found"}}, 404
    
    comments = answer.comments
    comments_dict = {comment.id: comment.to_dict() for comment in comments}

    nested_comments = build_nested_comments(comments_dict)

    return nested_comments

# add a comment
@login_required
@answer_routes.route('/<int:answer_id>/comment/add', methods=["POST"])
def create_comment(answer_id):

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
        answer_id = answer_id,
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