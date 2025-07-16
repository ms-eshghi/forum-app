# Forum App with Authentication (TypeScript + Node.js + MongoDB)

A simple forum application built with Node.js, Express, TypeScript, and MongoDB. Includes features for user registration, login with JWT authentication, and posting/deleting topics with role-based access.

## Features

- User Registration & Login
- JWT Authentication & Role-based Access (Admin)
- Authenticated Users Can Post Topics
- Admins Can Delete Any Topic
- Built with Express.js, Mongoose, and TypeScript
- Clean UI with MaterializeCSS

- **Frontend**: HTML, CSS (Materialize), JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JSON Web Tokens (JWT)
- **Security**: bcrypt for password hashing
- **Validation**: express-validator
- **Language**: TypeScript

1. Clone the Repository

git remote add origin https://github.com/ms-eshghi/forum-app.git
cd forum-app

2. Install Dependencies
   npm install

3. Create a .env File
   SECRET=your_jwt_secret

4. Compile TypeScript & Start Server (Dev Mode)
   npm run dev

Make sure MongoDB is running on mongodb://localhost:27017/testdb or update the connection string in app.ts.

📦 Scripts
npm run dev # Start in development (ts-node + nodemon)
npm run build # Compile TypeScript to JS
npm start # Run compiled JS from /dist/src

\*\* Features Walkthrough
Visit /register.html to create a user account.

Use the login form in index.html to sign in.

After login:

Users can post topics.

Admins can delete topics.

Token is stored in localStorage and used for secure API access.

Logout resets UI and removes token.
