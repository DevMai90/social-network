const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Create Schema - Schemas How will our collections structure look like? Review
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// 1. Export as a variable called User
// 2. User will use mongoose to pass in the 'users' model based on UserSchema defined above.
module.exports = User = mongoose.model('users', UserSchema);
