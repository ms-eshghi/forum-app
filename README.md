JWT Authentication with Express & TypeScript
Overview
This project demonstrates a simple web application backend that implements user authentication using JWT (JSON Web Tokens). It includes:

User registration with hashed passwords (bcrypt)

User login with JWT token generation

A protected route accessible only with valid JWT token

Basic frontend pages for register, login, and protected content

Token storage in localStorage on client side

Features
POST /api/user/register: Register new users with email and password. Passwords are securely hashed using bcrypt. Prevents duplicate email registration.

POST /api/user/login: Authenticate user credentials and return a signed JWT token.

GET /api/private: Protected route that requires a valid JWT token.

Frontend: Simple HTML pages with forms for register and login, storing JWT token in localStorage, and logout functionality.

Technologies
Node.js & Express.js

TypeScript

bcryptjs for password hashing

jsonwebtoken for JWT token creation and verification

dotenv for environment variable management

cors for Cross-Origin Resource Sharing

Simple file-based user store (in-memory array)

Setup Instructions
1. Clone the repository
git clonehttps://github.com/ms-eshghi/JWT.git
cd jwt-auth-project
2. Install dependencies
npm install
3. Create .env file in the root directory
Create a .env file and add your JWT secret key:
env
SECRET=your_super_secret_key
PORT=3000
Replace your_super_secret_key with a secure, random string.

Port is optional (default is 3000).

4. Run the server
npm run start
or in development mode with auto-reloading:

npm run dev
API Endpoints
Register a user
URL: /api/user/register

Method: POST

Body:

json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
Success response:

{
  "email": "user@example.com",
  "password": "$2b$10$hashedpasswordstring..."
}
Error: 403 if email already exists.

Login user
URL: /api/user/login

Method: POST

Body:

{
  "email": "user@example.com",
  "password": "yourpassword"
}
Success response:
{
  "token": "jwt_token_string_here"
}
Error: 403 if invalid credentials.

Access protected route
URL: /api/private

Method: GET

Headers:

http
Authorization: Bearer <token>
Success response:

{
  "message": "This is protected secure route!"
}
Error: 401 Unauthorized if no or invalid token.

Frontend Usage
Access /register.html to register a new user.

After successful registration, redirected to /login.html.

Login page stores JWT token in localStorage as "token".

Protected pages check for token in localStorage and call /api/private.

Logout button clears token from localStorage and redirects to login page.

Notes
This project uses an in-memory array to store users, so data resets on server restart. Replace with a database for production.

Always protect your JWT secret key.

Use HTTPS in production to secure tokens during transit.

Scripts
npm run start - Run compiled JavaScript app with Node.

npm run dev - Run app in development mode with TypeScript watch and auto restart.

Dependencies
express

bcryptjs

jsonwebtoken

dotenv

cors

typescript

ts-node-dev (dev dependency)

