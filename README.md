ToDoApp
Overview

ToDoApp is a simple web based task management application.
The purpose of this project is to allow users to manage their daily tasks in one place.

The system allows users to:

• create an account
• log in securely
• create and manage tasks
• assign priorities to tasks
• add descriptions and due dates
• organise tasks in a simple dashboard

The application is built using Node.js, SQLite, HTML, CSS, and JavaScript.
It runs locally on a computer using a small Node.js server.

This project was created as part of a learning exercise to understand full stack web development and basic backend systems.

Technologies Used

The project uses the following technologies:

Backend

Node.js
Express.js
SQLite database

Frontend

HTML
CSS
JavaScript

Security

bcrypt for password hashing

Other tools

Git
GitHub
Visual Studio Code

Project Structure

The project is organised into the following folders and files:

ToDoApp
│
│ server_js.js
│ package.json
│ package-lock.json
│ .gitignore
│
├── public
│ │ index_html.html
│ │ register_html.html
│ │ dashboard_html.html
│ │ style_css.css
│ │ script_js.js
│
└── utils_db
│ db_js.js
server_js.js

This file starts the Node.js server and defines the application routes such as login, registration, and dashboard access.

utils_db/db_js.js

This file creates and connects to the SQLite database.
It also creates the required tables if they do not exist.

public folder

This folder contains the frontend of the application.

index_html.html
Login page for existing users.

register_html.html
Registration page where new users create an account.

dashboard_html.html
Main application page where tasks are displayed and managed.

style_css.css
All styling for the user interface.

script_js.js
Handles task interactions on the dashboard.

Database

The application uses SQLite as a local database.

The database file is created automatically when the server runs.

Two tables are used:

Users Table

Stores user information such as username, email, name, surname, and hashed password.

Tasks Table

Stores task information including:

title
description
priority
due date
task status
tags
dependencies

Each task is linked to a specific user.

Installation

To run the project locally, follow these steps.

1 Install Node.js

Download Node.js from

https://nodejs.org

Check installation

node -v
2 Clone the repository
git clone https://github.com/IgnatiusKhumalo/ToDoApp.git

Move into the project folder

cd ToDoApp
3 Install dependencies

Run

npm install

This installs the required packages used by the project.

4 Start the server

Run the server with

node server_js.js

You should see a message showing that the server is running.

5 Open the application

Open a browser and go to

http://localhost:3000

You can then register a user and start creating tasks.

GitHub Notes

The repository uses a .gitignore file to prevent certain files from being uploaded.

The following files are ignored:

node_modules
database_db.db

The database file is created automatically when the server runs, so it does not need to be stored in the repository.

Purpose of the Project

This project was built to practice the following skills:

• backend development with Node.js
• working with a database
• creating a login system
• organising a full stack project structure
• using Git and GitHub for version control

Future Improvements

Possible improvements for the application include:

calendar task view
task notifications
task attachments
mobile responsive design
dark and light theme switching
advanced task filtering

Author

Ignatius Khumalo

GitHub
https://github.com/IgnatiusKhumalo

License

This project is open source and available for educational use.
