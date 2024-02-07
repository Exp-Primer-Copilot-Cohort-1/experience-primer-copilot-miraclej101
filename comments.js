// Create web server using express
// Create a router for comments
// Comments will be stored in a JSON file
// GET /comments - return all comments
// POST /comments - add a new comment
// DELETE /comments/:id - delete comment by id

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const commentsPath = path.join(__dirname, 'comments.json');

app.use(express.json());

app.get('/comments', (req, res) => {
  const comments = JSON.parse(fs.readFileSync(commentsPath, 'utf-8'));
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const comments = JSON.parse(fs.readFileSync(commentsPath, 'utf-8'));
  const newComment = req.body;
  newComment.id = comments.length + 1;
  comments.push(newComment);
  fs.writeFileSync(commentsPath, JSON.stringify(comments, null, 2));
  res.json(newComment);
});

app.delete('/comments/:id', (req, res) => {
  const comments = JSON.parse(fs.readFileSync(commentsPath, 'utf-8'));
  const id = Number(req.params.id);
  const index = comments.findIndex(comment => comment.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Comment not found' });
  } else {
    comments.splice(index, 1);
    fs.writeFileSync(commentsPath, JSON.stringify(comments, null, 2));
    res.json({ message: 'Comment deleted' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});


