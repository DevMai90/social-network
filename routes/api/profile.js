const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile');

// Load User Profile
const User = require('../../models/User');

// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public
router.get('/test', (req, res) =>
  res.json({ msg: 'Profile route handler works' })
);

// @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    // Protected route. The token will put user into req.user - See passport.js
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          // Note that we want errors as its variable - Initialize empty errors object
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json({ errors });
        }

        res.json(profile); // Automatically sends status 200!
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
