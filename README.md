# README for Authorization Test

### Overview

This repository contains a full-stack application with a Vue.js frontend and an Express.js backend. It is designed to demonstrate authorization processes in a web application.

### Structure

The application is divided into two main parts:

**Frontend:** Built with Vue.js.  
**Backend:** Built with Express.js

Both parts need to be running simultaneously for the application to work correctly.

### Step 1: Clone the Repository

```bash
git clone https://github.com/johnathan-booy/authorization-test.git
```

```bash
cd authorization-test
```

### Step 2: Start the Backend

Change to the backend directory:

```bash
cd api
```

Ensure that you are using the correct version of Node.js:

```bash
nvm use
```

Install the necessary node modules:

```bash
npm install
```

**Ensure you have a `.env` file with the correct credentials. (Contact a fellow developer to obtain this file if you don't have it.)**

Set up your PostgreSQL database and update the .env file with the appropriate credentials.

Run Knex migrations:

```bash
npm run migrate
```

Start the backend server on `localhost:3000`:

```bash
npm run dev
```

### Step 3: Start the Frontend

In a separate terminal, navigate to the frontend directory:

```bash
cd ../frontend
```

Ensure that you are using the correct version of Node.js:

```bash
nvm use
```

Install the necessary node modules:

```bash
npm install
```

Start the frontend server on `localhost:5173`:

```bash
npm run dev
```
