Task Tracker

A simple full-stack task tracking application that allows users to manage daily tasks by date.
Users can add tasks, mark them complete, edit them, or delete them. Completed tasks automatically move to a separate section.

Features

Add tasks for a selected date

Mark tasks as completed

Edit task titles

Delete tasks

Automatically separates pending and completed tasks

Smooth UI transitions for completed tasks

Date-based task filtering

Tech Stack

Frontend

React

Axios

CSS / Inline styling

Backend

Node.js

Express

REST API

Database

SQLite

Project Structure
task-tracker/
│
├── frontend/
│   ├── components/
│   │   ├── TaskForm.jsx
│   │   ├── TaskList.jsx
│   │   └── TaskItem.jsx
│   │
│   └── App.jsx
│
├── backend/
│   ├── routes/
│   └── server.js
│
└── README.md
API Endpoints
Get tasks by date
GET /api/tasks?date=YYYY-MM-DD
Create task
POST /api/tasks

Body:

{
  "title": "Buy groceries",
  "date": "2026-03-16"
}
Update task
PATCH /api/tasks/:id

Body example:

{
  "completed": 1
}

or

{
  "title": "Updated task title"
}
Delete task
DELETE /api/tasks/:id
Installation
Clone repository
git clone https://github.com/yourusername/task-tracker.git
Install dependencies

Frontend:

npm install

Backend:

npm install
Run the application

Start backend:

npm run dev

Start frontend:

npm run dev
Future Improvements

User authentication

Drag-and-drop task ordering

Task priority levels

Mobile UI improvements

Cloud deployment

Author

Raj J
