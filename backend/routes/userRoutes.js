const express = require('express');
const User = require('../models/User');  // Import the User model
const router = express.Router();

// Get a list of all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users from the database
    res.json(users);  // Send the list of users as a response
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Get user details by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);  // Find user by ID
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);  // Send the user details as a response
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Rate a user (update their rating)
router.post('/rate/:id', async (req, res) => {
  const { rating } = req.body;  // Get the rating from the request body
  try {
    const user = await User.findById(req.params.id);  // Find user by ID
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.rating = rating;  // Update the user's rating
    await user.save();  // Save the updated user data to the database
    res.json(user);  // Send the updated user back as a response
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Export the user routes
module.exports = router;
