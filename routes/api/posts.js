const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // Because we are dealing with the database
const passport = require('passport'); // Will have protected routes

// Load Post model
const Post = require('../../models/Post');

// Validation
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) =>
  res.json({ msg: 'Posts route handler works' })
);

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newPost = new Post({
      test: req.body.text,
      name: req.body.name,
      avatar: req.body.name,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
