const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema - Schemas describe to Mongoose what your data should
// look like and how to interact with it.
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
// 2. User will use mongoose to pass in the 'users' model name  based on UserSchema defined above.
// 3. Models USE schemas. They are not the same thing.
module.exports = User = mongoose.model('users', UserSchema);

// The actual interaction with the data happens through the model obtained from
// mongoose.model() Allows to use mongoose methods.
