const express = require('express');
const router = express.Router();
const { data } = require('./data');

// Get all posts
router.get('/', (req, res) => {
  res.json(Object.values(data.posts));
});

// Add a new post
router.post('/', (req, res) => {
  const { title, content } = req.body;
  const id = Date.now();
  data.posts[id] = { id, title, content, comments: [] };
  res.status(201).json(data.posts[id]);
});

// Update a post by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (data.posts[id]) {
    data.posts[id].title = title || data.posts[id].title;
    data.posts[id].content = content || data.posts[id].content;
    res.json(data.posts[id]);
  } else {
    res.status(404).send('Post not found');
  }
});

// Delete a post by ID (and its comments)
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  if (data.posts[id]) {
    delete data.posts[id];
    res.sendStatus(204);
  } else {
    res.status(404).send('Post not found');
  }
});

module.exports = router;
