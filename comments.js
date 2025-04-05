// Create web server
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Create express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a schema and model for comments
const commentSchema = new mongoose.Schema({
  name: String,
  comment: String,
});
const Comment = mongoose.model('Comment', commentSchema);

// Define routes
app.get('/comments', async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
});

app.post('/comments', async (req, res) => {
  const newComment = new Comment(req.body);
  await newComment.save();
  res.status(201).json(newComment);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});