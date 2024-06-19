import os
import openai
from openai import OpenAI
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from flask import current_app


openai_routes = Blueprint('openai', __name__)
api_key = os.environ.get('OPENAI_API_KEY')
client = OpenAI(api_key=api_key)

system_message = "You are an AI assistant at askQuora (a platform where users can ask questions and get answers)."

def get_completion(prompt, model="gpt-3.5-turbo"):
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ],
        temperature=0,
        # max_tokens=100,
    )
    return response.choices[0].message.content

def get_completion_from_messages(messages, model="gpt-3.5-turbo"):
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=1,
    )
    return response.choices[0].message.content

@login_required
@openai_routes.route('/edit', methods=["POST"])
def edit():
    data = request.json
    user_content = data.get("userContent")
    if not user_content:
        return jsonify({'error': 'No user content provided'}), 400

    prompt = f"""
    Your task is to edit questions or answers created by users to make them clearer and more concise. \
    The text you need to edit is {user_content}
    """
    try:
        response = get_completion(prompt)
        return jsonify({'editedContent': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@login_required
@openai_routes.route('/chat', methods=["POST"])
def chat():
    data = request.json
    messages = data.get("messages")
    if not messages :
        return jsonify({'error': 'No user content provided'}), 400

    try:
        response = get_completion_from_messages(messages=messages)
        return jsonify({'reply': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500   
    

