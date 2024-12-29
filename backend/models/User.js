const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  githubID: { type: String, required: true },  // GitHub ID for the user
  username: { type: String, required: true },  // GitHub username
  email: { type: String, required: true },     // User's email (GitHub email)
  rating: { type: Number, default: 0 },        // Rating based on contributions
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }], // List of team room IDs the user belongs to
  // Optionally, you can also store other info like profile picture, etc.
});

const User = mongoose.model('User', userSchema);  // Create the model

module.exports = User;  // Export the model for use in other files
