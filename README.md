# Jobs App

Jobs App is a web application where users can browse and apply for jobs, save their favorite jobs, and manage their profiles. Recruiters can post jobs and accept or decline applicants. The app is well-secured against JavaScript, XSS, and SQL injections. All inputs have filters and validations on the frontend, and the backend uses additional security measures including Zod validation, token verification, rate limiting, CORS, and file handling with FS and Multer.

## Features

- Users can create a new account and choose their role (Recruiter or Employee), or log in to an existing account.  
- Employees can browse jobs filtered based on their roles and technologies, apply to jobs, or save them for later.  
- Recruiters can create job opportunities.  
- Recruiters can accept or decline applicants and manage applications through their account page.  
- Users can manage profile information and upload profile pictures.  

## Technologies

- React + Vite  
- Express.js  
- MySQL  
- Git  

## Installation

1. Clone Repository -

    git clone https://github.com/Apridonidze/jobs-app.git
    cd jobs-app

2. Install Dependencies -

    cd frontned npm install
    cd backend npm install

3. Database Setup -

    CREATE DATABASE jobs_app;
    Import database/schema.sql content into Database

4. Environment Variables -

    Create .env file in /backend and add followings :

        SERVER_PORT = 8080
        FRONTEND_URL = http://localhost:5173

        JWT_SECRET_KEY = your_secret_key

        DB_HOST  = localhost
        DB_USER = root
        DB_PASSWORD = your_password
        DB_DATABASE = jobs_db

5. Running the App :
    cd frontned
    npm run dev

    cd backend 
    nodemon server.js
