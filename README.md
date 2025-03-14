# askQuora

### Link to live site:
https://askquora.onrender.com/

### Developer
Fiona(Lei) Li [Github](https://github.com/leileili1010)

### Let's Get Technical
In this project I have used the following tech stack:
- Front end: Javascript, React, Redux, HTML5, CSS3
- Backend: Python, Flask, PostgreSQL
- Cloud: AWS S3
- Testing: Postman for API testing
- Deployment: Docker and Render

### Summary
askQuora aims to provide a similar platform as Quora where users can ask questions, post answers, and engage in discussions on a wide range of topics. The platform allows users to subscribe to topics of interest, receive recommendations for relevant questions and topics, and format their answers using rich text editors for better readability.

## Screenshots
#### Login Page
![image](https://github.com/leileili1010/askQuora/assets/143532361/572d8319-e731-48bc-af5f-f6c26cdc1028)

#### Home Page
![image](https://github.com/leileili1010/askQuora/assets/143532361/2707d693-0c31-42be-ba3e-e65b3bfa435d)

#### Post an Answer
![askQuora_3](https://github.com/leileili1010/askQuora/assets/143532361/b2f9442f-a47c-4fbe-8b9b-c0128704cb11)

#### Subscribe a Topic
![askQuora_4](https://github.com/leileili1010/askQuora/assets/143532361/53ef0c9d-1790-4829-91ba-09a5adcd8fbd)

## Getting started

1. Clone this repository (only this branch).

2. To install dependencies for backend.

   At the root of the repository run:

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a __.env__ file based on the example with proper settings for your
   development environment.

4. Make sure the database (Your choice in database serrvice, I used SQLite3 for development and PostgreSQL for production) connection URL is in the **.env** file.

5. This `.env.example` organizes all tables inside the `flask_schema` schema defined
   by the `SCHEMA` environment variable. Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. The React frontend has my project styling applied, you will have to alter any component's `.css` file if changes are needed.

8. To run the React frontend in development:
  - Split into a new terminal
  - `cd` into the **react-vite**
  directory and run `npm i` to install dependencies.
  - Next, run `npm run build`
  to create the `dist` folder.
  - Run `npm run build` every time before live deployment.
  - You can run from the default port in development to see changes live.

## Features
1. Users
- users can create an account
- users can Log-in and Logout of their created account with authentication
2. Questions
- Logged in users can view questions
- Logged in users can post questions
- Logged in users can update questions 
- Logged in users can delete questions
3. Answers
- Logged in users can view answers to questions
- Logged in users can post their answers
- Logged in users can update their answers
- Logged in users can delete answers
4. subcription
- Logged in users can view subscriptions
- Logged in users can subscribe to different topics
- Logged in users can delete their subscriptions

## User Stories
1. User Account
- Logged in users can view their account details
- Logged in users can view question/answers they posted and subscriptions
- Logged in users can update their questions and answers
- Logged in users can delete their questions and answers
2. Question
- Logged in users can view questions so to find information and contribute to discussions
- post a question, number of answers will be displayed below question
- Logged in users can post a question to seek answers from the community
- Logged in users can udate posted questions to correct mistakes or add more details
- Logged in users can delete posted questions if they are no longer relevant or if user received the needed information
3. Answer
- Logged-in user can view answers to questions to gain knowledge or find solutions to problems
- Logged-in user can post answers to questions, text, code, and images are all supported forms in their answers
- Logged-in user can update posted answers to correct mistakes or provide additional information
- Logged-in user can delete posted answers if they are no longer relevant or if the user wants to retract response
4. Subscription
- Logged-in user can view subscriptions so that the user can keep track of the topics the user interested in
- Logged-in user can subscribe to different topics so that the user can receive updates and stay informed about new content
- Logged-in user can delete subscriptions if the user longer interested in a topic
5. Search 
- Logged-in user can search for questions by keyword so that user can quickly find relevant questions and answers
  


