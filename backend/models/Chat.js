const mongoose = require('mongoose');

// Define the Chat schema
const chatSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',  // Assuming you have a Room schema to reference
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Assuming you have a User schema to reference
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create the model using the schema
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;

