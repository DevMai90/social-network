const express = require('express');
const router = express.Router();

// @route   api/users/test
// @desc    Test users route
// @access  Public
router.get('/test', (req, res) =>
  res.json({ msg: 'Users route handler works' })
);

module.exports = router;
