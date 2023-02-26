# MERN Stack Social Media App 
# Fakebook - Backend

This is the backend component of a social media app built using the MERN stack. The backend is built using Node.js, Express, and MongoDB, and it provides the necessary endpoints to manage users, posts, and comments for the app.

## Directory Structure
The directory structure for the project is as follows:
```
backend/
├─── .env
├───config
│   └── config.js
├─── controllers
│   └── userController
│   └── postController
│   └── commentController
├───models
│   └── user
│   └── post
│   └── comment
├───routes
│   └── authRoutes
│   └── postRoute
│   └── userRoutes
│   └── commentRoute
|   └── index
├─── middlewares
│   └── verify
│   └── notFound
│   └── errorHandling
├─── utils
│   └── utility functions
├─── db-connection
└─── server
```

- The `config/` folder contains a config.js file for setting up the environment variables for the app.
- The `controllers/` folder contains the controllers for handling the business logic for the posts and users.
- The `models/` folder contains the Mongoose models for the posts and users.
- The `routes/` folder contains the Express routes for the API endpoints for the posts and users.
- The `middleware/` folder contains any middleware functions that may be needed in the future.
- The `server.js` file is the main file for starting the backend server and connecting to the database.

## Models
- `User` - The User model represents a user account in the app.
- `Post` - The Post model represents a post created by a user in the app.
- `Comment` - The Comment model represents a comment on a post in the app.

## Controllers
- `userController`- contains functions for creating and managing user accounts
- `postController` - contains functions for creating and managing posts
- `commentController` - contains functions for creating and managing comments

## Endpoints
The API endpoints for the backend are as follows:

### Auth
- `POST /api/auth/register` - Registers a new user. The body of the request should contain the name, email, and password of the user.
- `POST /api/auth/login` - Logs in an existing user. The body of the request should contain the email and password of the user.
- `POST /api/auth/logout` - Logs out an loged in user.
### User
- `GET /api/user/:userId` - Gets the details of a user with the specified ID.
- `PUT /api/user/:userId` - Updates the details of a user with the specified ID. The body of the request should contain the updated name, email, and/or password of the user.
- `DELETE /api/user/:userId` - Deletes a user with the specified ID.
### Post
- `POST /api/post/new` - Creates a new post. The body of the request should contain the content and author of the post.
- `GET /api/post/timeline` - Gets a list of all posts from my timelines.
- `GET /api/post/person/:userId` - Gets a list of all posts a particuler user.
- `GET /api/posts/:postId` - Gets the details of a post with the specified ID.
- `PUT /api/posts/:postId` - Updates the details of a post with the specified ID. The body of the request should contain the updated content of the post.
- `DELETE /api/posts/:postId` - Deletes a post with the specified ID.
- `POST /api/post/:postId/like` - Adds a like from current user.
- `DELETE /api/post/:postId/like` - Removes a like from current user.
### Comment
- `POST /api/comment/:postId/new` - Creates a new comment on a post with the specified ID. The body of the request should contain the content and author of the comment.
- `GET /api/comment/:postId/all` - Gets a list of all comments for a post with the specified ID.
- `GET /api/comment/:commentId` - Gets the details of a comment with the specified ID for a post with the specified ID.
- `PUT /api/comment/:commentId` - Updates the details of a comment with the specified ID for a post with the specified ID. The body of the request should contain the updated
- `DELETE /api/comment/:commentId` - Deletes the comment by specified ID.

## Installation Guide for Node.js API
### Prerequisites
Before you begin, make sure that you have the following software installed on your system:

- Node.js (version 12 or higher)
- NPM (Node Package Manager)
- Git (optional, but recommended)
- MongoDB (Database, either cloud or local)

### Installation Steps
- Clone the repository
```
git clone https://github.com/XenonBird/fakebook-backend.git
```
- Install dependencies
```
npm install
```

Create a `.env` file like follows

```
DB_HOST=<db-host>
DB_PORT=<db-port>
DB_NAME=<db-name>
DB_USER=<db-username>
DB_PASS=<db-password>
PORT=<server-port>
```

> **_NOTE:_**  If you are using mongodb locally you don't need `.env` file.

- Run the code
```
npm run dev
```
This will start the server on port 5000 by default. You can change the port by setting the PORT environment variable in the .env file.

Test the API

You can test the API by sending requests to the server using a tool like Postman, curl or Thunder Client (vscode extension).

# Contribution guide

Create your branch and modifiy as you want then commit to your branch. If everything is going alright then made a  pull request.
> **_NOTE:_** Thank you for your contribution in ADVANCE.

# Licensing Information
😉 We want to make it easy for everyone to use, learn, practice and build upon our work, so we have chosen to make everything on this page copyright-free.

👍 Feel free to use and share any of the content you find here, without the need for attribution or any other restrictions. We believe that collaboration and innovation are best supported by open access to knowledge and ideas, so we want to do our part to promote that ideal.

💖 If you do use any of our content, we would love to hear about it and see what you've created! You can reach out to us at any just mail us on `bird.xenon@gmail.com`.

😊 Thank you for considering our work, and we hope that it can be of use to you in your own projects. 
