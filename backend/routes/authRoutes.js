// routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to start GitHub authentication
router.get('/github', passport.authenticate('github', {
  scope: ['user:email'],  // Request access to the user's email
}));

// Route to handle the callback from GitHub after authentication
router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/login',  // Redirect to login page if authentication fails
}), (req, res) => {
  // Redirect to the user's profile page if successful
  res.redirect('/profile');
});

module.exports = router;
