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
At **askQuora**, we're all about sparking great discussions, especially in the world of **software engineering**. Whether you're debugging a tricky bug, exploring the latest tech trends, or just sharing your knowledge, this is the perfect space for you.  

✨ **Stay in the loop** with personalized recommendations.  
🛠️ **Format your answers beautifully** with our rich text editor.  
🤖 **Get AI-powered assistance** to refine your content and enhance your answers.  

Join our growing community, ask your questions, share your expertise, and let's build something amazing together! 🚀

## Demo
#### Login Page
![image](https://github.com/leileili1010/askQuora/assets/143532361/572d8319-e731-48bc-af5f-f6c26cdc1028)

#### Home Page
![image](https://github.com/leileili1010/askQuora/assets/143532361/2707d693-0c31-42be-ba3e-e65b3bfa435d)

#### Post an Answer
![askQuora_3](https://github.com/leileili1010/askQuora/assets/143532361/b2f9442f-a47c-4fbe-8b9b-c0128704cb11)

#### Subscribe a Topic
![askQuora_4](https://github.com/leileili1010/askQuora/assets/143532361/53ef0c9d-1790-4829-91ba-09a5adcd8fbd)

## Features - What You Can Do on askQuora
At askQuora, we believe in making learning and discussions easy, engaging, and fun! Whether you're here to ask, answer, or just explore, here’s everything you can do:

### 🤖 AI Chatbot & Smart Content Suggestions (NEW! 🚀)
- Got a tricky question? Our AI chatbot can help you refine it for better responses.
- Need help writing an answer? Get AI-powered suggestions to make your response clear and impactful.
- Let AI assist you in generating content, fixing grammar, and enhancing readability.

### 👤 User Account
-  View and manage your account details in one place.
- Keep track of all your questions, answers, and subscriptions easily.
- Update or delete your questions and answers whenever you need to—because we all change our minds sometimes!

### ❓ Questions – Ask Away!
- Find relevant discussions by browsing questions from the community.
- Post your own question to get answers from experts and enthusiasts.
- See how many answers your question has received at a glance.
- Edit your questions anytime—to fix typos, add details, or refine your thoughts.
- Delete questions if they’re no longer relevant or you got the answers you needed.

### 💡 Answers – Share Your Knowledge!
- Read answers from real people who have been there, done that.
- Post your own answers—whether it’s text, code snippets, or images.
- Edit your answers to keep them accurate and helpful.
- Delete answers if they no longer make sense or if you want to update your stance.

### 🔔 Subscriptions – Stay in the Loop!
-  Follow topics you love and never miss a discussion.
- Get updates on new questions and answers in your favorite categories.
- Unsubscribe from topics when you’re no longer interested (we won’t take it personally! 😉).

🔍 Search – Find What Matters!
🔹 Search by keywords to quickly find relevant questions and answers.
🔹 Save time by jumping straight to the best insights instead of scrolling endlessly.

### 💬 Comments – Keep the Discussion Going!
- Leave comments on questions and answers to ask for clarifications or share extra insights.
- Engage in mini discussions without needing to post a full answer.
- Add a friendly nudge like, "Hey, can you explain this part more?" or "Great answer! Here’s an additional thought..."

Join askQuora today, be part of the conversation, and let’s make learning fun, insightful, and engaging together! 🎉💡
  
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

