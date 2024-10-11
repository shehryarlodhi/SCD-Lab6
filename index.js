const express = require('express');
const app = express();
const port = 3000;

const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

app.use(express.json());

// Route to manage posts
app.use('/posts', postsRouter);

// Route to manage comments for a specific post
app.use('/posts/:postId/comments', commentsRouter);

app.listen(port, () => {
  console.log(`Blog platform listening at http://localhost:${port}`);
});
