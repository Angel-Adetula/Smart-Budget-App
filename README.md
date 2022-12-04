# Smart-Budgeting-App

How to run the program:
# Firstly start the plaid API server
--> cd start (This is the plaid API folder).
--> npm start

# Then run the backend server. 
--> cd backend
--> npm run devStart

# Then run the program
--> cd frontend
--> npm start

# Program details.

This project was aimed at giving users a place to create categorized budgets and keep track of their 
expenses. The technologies I used for this project was React.js, Express.js, MongoDB, and Plaid API. I 
used React to create the frontend for my project while I used Express.js to create two REST APIs with 
Post, Update and Get methods. I used MongoDB to store user information entered by the users which I 
used for authentication purposes, and track keeping. The Plaid API, which I connected to my project, 
allowed user to connect their bank account to my project. I only used the sand box environment for my 
Plaid API. 
