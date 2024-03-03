from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from .aws_helper import ALLOWED_EXTENSIONS, get_unique_filename, upload_file_to_s3, remove_file_from_s3
from ..forms import ImageForm

image_routes = Blueprint('images', __name__)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@login_required
@image_routes.route('/upload-image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"errors": "No image file provided"}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({"errors": "No selected file"}), 400

    if file and allowed_file(file.filename):
        unique_filename = get_unique_filename(file.filename)
        file.filename = unique_filename
        response = upload_file_to_s3(file)
        if "errors" in response:
            return jsonify(response), 500
        return jsonify(response), 200

    return jsonify({"errors": "Invalid file type"}), 400