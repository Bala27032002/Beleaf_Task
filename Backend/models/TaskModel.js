const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: Number,
  id: Number,
  title: String,
  body: String,
});

module.exports = mongoose.model('Post', postSchema);
