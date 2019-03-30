const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');

// Load User model
const User = require('../../models/User');

// @route   api/users/test
// @desc    Test users route
// @access  Public
router.get('/test', (req, res) =>
  res.json({ msg: 'Users route handler works' })
);

// @route   api/users/register
// @desc    Register user
// @access  Public

// When we send data to a route through a post request, we access it with req.body
// Mongoose uses either callbacks or promises. Using promises in this app.
router.post('/register', (req, res) =>
  // Check if email already exists
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      };
    }
  })
);

module.exports = router;
