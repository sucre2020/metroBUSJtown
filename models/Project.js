// models/Project.js
const mongoose = require('mongoose');

const projecttSchema = new mongoose.Schema({
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
  },
  gender: {
    type: String,
    required: true
  },
  student: {
    type: String,
    required: true
  },
  working: {
    type: String,
    required: true
  },
  hobbies: {
    type: String,
    required: true
  }
  
});

module.exports = mongoose.model('Project', projecttSchema);