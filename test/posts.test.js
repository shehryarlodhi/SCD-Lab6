const request = require('supertest');
const app = require('../index');  // Import the app instance

describe('Blogging Platform API', () => {
  let postId; // To store the ID of the created post
  let commentId; // To store the ID of the created comment

  // Test for getting all posts
  it('should return all posts', async () => {
    const res = await request(app).get('/posts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test for creating a new post
  it('should create a new post', async () => {
    const newPost = {
      title: 'Test Post',
      content: 'This is a test post.',
    };
    const res = await request(app).post('/posts').send(newPost);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe(newPost.title);
    postId = res.body.id; // Save the ID for future tests
  });

  // Test for updating an existing post
  it('should update an existing post', async () => {
    const updatedPost = {
      title: 'Updated Test Post',
      content: 'This is an updated test post.',
    };
    const res = await request(app).put(`/posts/${postId}`).send(updatedPost);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title', updatedPost.title);
  });

  // Test for deleting a post
  it('should delete a post', async () => {
    const res = await request(app).delete(`/posts/${postId}`);
    expect(res.statusCode).toBe(204);
  });

  // Test for getting comments for a specific post
  it('should return all comments for a specific post', async () => {
    // Create a post to have comments associated with it
    const newPost = {
      title: 'Post with Comments',
      content: 'This post will have comments.',
    };
    const postRes = await request(app).post('/posts').send(newPost);
    const createdPostId = postRes.body.id;

    // Create comments for the post
    const comments = [
      { text: 'Great post!' },
      { text: 'Very informative.' },
      { text: 'Thanks for sharing!' },
    ];
    for (const comment of comments) {
      await request(app).post(`/posts/${createdPostId}/comments`).send(comment);
    }

    const res = await request(app).get(`/posts/${createdPostId}/comments`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(comments.length); // Expect the number of comments to match
  });

  // Test for creating a new comment for a post
  it('should create a new comment for a post', async () => {
    const newComment = { text: 'This is a new comment.' };
    const res = await request(app).post(`/posts/1/comments`).send(newComment);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    commentId = res.body.id; // Save the ID for future tests
  });

  // Test for updating an existing comment
  it('should update an existing comment', async () => {
    const updatedComment = { text: 'This is an updated comment.' };
    const res = await request(app).put(`/posts/1/comments/${commentId}`).send(updatedComment);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('text', updatedComment.text);
  });

  // Test for deleting a comment from a post
  it('should delete a comment from a post', async () => {
    const res = await request(app).delete(`/posts/1/comments/${commentId}`);
    expect(res.statusCode).toBe(204);
  });
});
