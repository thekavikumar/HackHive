const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // Room name is required
    trim: true,      // Removes extra spaces from the start and end
    minlength: 3,    // Minimum length of room name
    maxlength: 50,   // Maximum length of room name
  },
  description: {
    type: String,
    trim: true,      // Removes extra spaces from description
    maxlength: 255,  // Limits the description to 255 characters
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,  // User's ID
      ref: "User",  // Reference to the User model
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,  // Sets the default creation date to the current time
  },
  isActive: {
    type: Boolean,
    default: true,  // Room is active by default
  },
});

module.exports = mongoose.model("Room", roomSchema);  // Export Room model
