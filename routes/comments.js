const express = require('express');
const router = express.Router({ mergeParams: true });
const { data } = require('./data');

// Get all comments for a specific post
router.get('/', (req, res) => {
  const postId = req.params.postId;
  if (data.posts[postId]) {
    res.json(data.posts[postId].comments);
  } else {
    res.status(404).send('Post not found');
  }
});

// Add a new comment to a specific post
router.post('/', (req, res) => {
  const postId = req.params.postId;
  if (data.posts[postId]) {
    const { text } = req.body;
    const commentId = Date.now();
    const newComment = { id: commentId, text };
    data.posts[postId].comments.push(newComment);
    res.status(201).json(newComment);
  } else {
    res.status(404).send('Post not found');
  }
});

// Update a specific comment by its ID
router.put('/:commentId', (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const { text } = req.body;

  const post = data.posts[postId];
  if (post) {
    const comment = post.comments.find(c => c.id == commentId);
    if (comment) {
      comment.text = text || comment.text;
      res.json(comment);
    } else {
      res.status(404).send('Comment not found');
    }
  } else {
    res.status(404).send('Post not found');
  }
});

// Delete a comment by its ID
router.delete('/:commentId', (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;

  const post = data.posts[postId];
  if (post) {
    const commentIndex = post.comments.findIndex(c => c.id == commentId);
    if (commentIndex !== -1) {
      post.comments.splice(commentIndex, 1);
      res.sendStatus(204);
    } else {
      res.status(404).send('Comment not found');
    }
  } else {
    res.status(404).send('Post not found');
  }
});

module.exports = router;
