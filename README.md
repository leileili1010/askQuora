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


