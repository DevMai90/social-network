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

// @route   POST /api/profile
// @desc    Create or edit user profile
// @access  Private

router.post(passport.authenticate('jwt', { session: false }), (req, res) => {
  // Get fields - Most will come from our forms
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;

  // Skills - Split into array
  if (typeof req.body.skills !== 'undefined')
    profileFields.skills = req.body.skills.split(',');

  // Social - Initialize an empty object first!
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  // Search profiles
  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      // Update - who to update, set profile fields (object we created), new option
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile));
    } else {
      // Create
    }
  });
});

module.exports = router;
