const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");  // Required for Socket.IO
const socketIo = require("socket.io");  // Required for Socket.IO
const roomRoutes = require("./routes/rooms");

dotenv.config();  // Load environment variables
const app = express();

// Create HTTP server and initialize Socket.IO
const server = http.createServer(app);
const io = socketIo(server);  // Initialize socket.io with the server

app.use(express.json());  // Middleware to parse JSON request bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Use Room routes
app.use("/rooms", roomRoutes);

// Set up Socket.IO events
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for 'joinRoom' event
  socket.on("joinRoom", (roomId) => {
    console.log(`User ${socket.id} joined room ${roomId}`);
    socket.join(roomId);  // Join the specified room
    io.to(roomId).emit("roomActivity", `User ${socket.id} has joined the room.`);
  });

  // Listen for chat messages inside rooms
  socket.on("chatMessage", (roomId, message) => {
    console.log(`Message from ${socket.id}: ${message}`);
    io.to(roomId).emit("chatMessage", message);  // Broadcast message to everyone in the room
  });

  // Listen for 'disconnect' event
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
