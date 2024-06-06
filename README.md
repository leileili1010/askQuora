# askQuora

### Link to live site:
https://askquora.onrender.com/

### Let's Get Technical
In this project I have used Javascript, React, Redux, Python, Flask, SQLAlchemy, PostgreSQL, Render, HTML5, CSS3, AWS S3

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
Users
users can create an account
users can Log-in and Logout of their created account with authentication
Vans
Logged in users can create new vans
Users can view vans
Logged in users can update their vans
Logged in users can delete their vans
Reviews
Logged in users can create new reviews
Users can view reviews
Logged in users can update their reviews
Logged in users can delete their reviews
Favorites
Logged in users can create new favorites
Logged in users can view their favorites
Logged in users can delete their favorites


