const express = require('express');
const router = express.Router();

// @route   GET api/posts/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) =>
  res.json({ msg: 'Posts route handler works' })
);

module.exports = router;
