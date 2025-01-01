const express = require('express');
const axios = require('axios'); // Import axios for making external API calls
const User = require('../models/User'); // Import the User model
const router = express.Router();

// Get a list of all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.json(users); // Send the list of users as a response
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Get user details by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Find user by ID
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user); // Send the user details as a response
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Rate a user (update their rating)
router.post('/rate/:id', async (req, res) => {
  const { rating } = req.body; // Get the rating from the request body
  try {
    const user = await User.findById(req.params.id); // Find user by ID
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.rating = rating; // Update the user's rating
    await user.save(); // Save the updated user data to the database
    res.json(user); // Send the updated user back as a response
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Get user's GitHub profile data
router.get('/github/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`); // Fetch GitHub profile data
    res.status(200).json(response.data); // Send GitHub profile data as a response
  } catch (err) {
    res.status(500).json({ message: 'Error fetching GitHub data', error: err });
  }
});

// Update user's profile
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update user profile
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user); // Send the updated user data as a response
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err });
  }
});

// Export the user routes
module.exports = router;
