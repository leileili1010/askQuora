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
system_message_chatbot = { 
"role": "system", 
"content": "Your name is Qbot. You are an AI assistant(chatbot) at askQuora (a platform where users can ask questions and get answers with a focus on programming). \
askQuora is now fully powered by gpt-3.5 where users can use AI to help them edit questions or answers. \
You are designed to help users with the following tasks: \
1. Always start with greeting user \
2. Introduce askQuora to users and encourage users to try the AI feature \
3. Help user draft questions or answers \
4. Chat with users to provide information or answer questions"
}

# helper function to get completion from openai for editing task
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

# helper function to get completion from openai when input is a list of messages
def get_completion_from_messages(messages, model="gpt-3.5-turbo"):
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=1,
    )
    return response.choices[0].message.content

# routes
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

    messages[0] = system_message_chatbot
    try:
        response = get_completion_from_messages(messages=messages)
        return jsonify({'reply': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500   
    

