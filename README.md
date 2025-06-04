# Gestor de Turnos

This project is a simple Express API to manage appointments (turnos) stored in a PostgreSQL database. It was designed to be easily deployed on [Railway](https://railway.app/) using a managed PostgreSQL instance.

## Environment configuration

1. Copy `.env.example` to `.env`.
2. Fill in the values for each variable. At minimum you must provide a `DATABASE_URL` with the PostgreSQL connection string. You can change `PORT` if needed.
3. The application reads these variables on start up.

## Deploying on Railway

1. Create a new project in Railway.
2. Add the PostgreSQL plugin to provision a database.
3. In the project settings, add the environment variables from `.env.example` (`DATABASE_URL` and `PORT`). Use the connection string provided by Railway for `DATABASE_URL`.
4. Deploy the service and run `npm start` as the start command.

Once started, the API will be accessible from the Railway provided URL, serving the routes defined in this repository.

