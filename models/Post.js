// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  favoriteColor: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
  
});

module.exports = mongoose.model('Post', postSchema);
