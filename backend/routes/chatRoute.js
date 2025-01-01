const express = require('express');
const Chat = require('../models/Chat');
const router = express.Router();

// Route to get all chats from a specific room
router.get('/getRoomChats/:roomId', async (req, res) => {
  try {
    const chats = await Chat.find({ roomId: req.params.roomId }).populate('userId', 'name');
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chats', error });
  }
});

// Route to add a new chat message
router.post('/addChat', async (req, res) => {
  const { roomId, userId, message } = req.body;

  if (!roomId || !userId || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newChat = new Chat({ roomId, userId, message });
    await newChat.save();
    res.status(201).json({ message: 'Chat added successfully', newChat });
  } catch (error) {
    res.status(500).json({ message: 'Error adding chat', error });
  }
});

// Search messages in a room
router.get('/:roomId/search', async (req, res) => {
  const { query } = req.query; // Pass search query as a query param
  try {
    const messages = await Chat.find({
      roomId: req.params.roomId,
      message: { $regex: query, $options: 'i' }, // Case-insensitive search
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error searching messages', error: err });
  }
});

module.exports = router;
