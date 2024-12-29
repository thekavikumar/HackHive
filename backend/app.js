// Import required dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const socketIo = require('socket.io');   // Import socket.io
const http = require('http');            // Import HTTP module to integrate with Express

// Import routes
const chatRoutes = require('./routes/chatRoutes'); 

dotenv.config();

const app = express();

// Create HTTP server to work with Socket.io
const server = http.createServer(app);

// Initialize Socket.io on the server
const io = socketIo(server);

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Register routes
app.use('/chat', chatRoutes);  // Use the chat routes under /chat

// Real-time Socket.io Communication
io.on('connection', (socket) => {
  console.log('New user connected');

  // Listen for incoming chat messages
  socket.on('sendMessage', (messageData) => {
    console.log('Message received:', messageData);
    // Broadcast the message to all connected clients
    io.emit('receiveMessage', messageData);
  });

  // Handle user disconnecting
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
