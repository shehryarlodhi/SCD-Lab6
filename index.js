const express = require('express');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

const app = express();
app.use(express.json());

// Routes
app.use('/posts', postsRouter);
app.use('/posts/:postId/comments', commentsRouter);

module.exports = app;  // Export the app instance without listening on a port
