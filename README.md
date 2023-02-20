# MERN Stack Social Media App - Fakebook-Backend

This is the backend component of a social media app built using the MERN stack. The backend is built using Node.js, Express, and MongoDB, and it provides the necessary endpoints to manage users, posts, and comments for the app.

## Directory Structure
The directory structure for the project is as follows:
```
backend/
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
