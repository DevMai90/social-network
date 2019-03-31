const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

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
  // Check if email already exists in User model
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      // Encrypt password - So that we don't send out the actual password.
      bcrpyt.genSalt(10, (err, salt) => {
        bcrpyt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          // Save the new user to MongoDB as a document within the users collection
          newUser
            .save()
            .then(user => res.json(user))
            .catch(console.log(err));
        });
      });
    }
  })
);

// @route   POST /api/users/login
// @desc    Login User / Return JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email - Use Mongoose method. findOne finds one document
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      return res.status(404).json({ email: 'User not found' });
    }

    // Check for password - Use bcrypt
    bcrpyt.compare(password, user.password).then(isMatch => {
      // bcrypt returns a boolean
      if (isMatch) {
        // User matched
        // Create JWT payload. We can include anything we want
        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        // Signed JWT token - payload, secret key, expiration time in seconds, callback
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: 'Password invalid' });
      }
    });
  });
});

module.exports = router;
