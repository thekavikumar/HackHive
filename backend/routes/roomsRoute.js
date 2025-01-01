const express = require("express");
const Room = require("../models/Room"); // Import the Room model

const router = express.Router();

// Create a new room
router.post("/", async (req, res) => {
  try {
    const room = await Room.create(req.body); // Create a room using the request body
    res.status(201).json(room); // Respond with the created room
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle errors
  }
});

// Get all rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find().populate("members"); // Fetch all rooms and populate members data
    res.json(rooms); // Respond with rooms
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors
  }
});

// Get a specific room by ID
router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate("members"); // Fetch room by ID
    if (!room) {
      return res.status(404).json({ error: "Room not found" }); // Handle non-existent room
    }
    res.json(room); // Respond with room data
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors
  }
});

// Add a member to a room
router.post("/:id/addMember", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const { userId } = req.body;
    if (room.members.includes(userId)) {
      return res.status(400).json({ message: "User already in the room" });
    }

    room.members.push(userId);
    await room.save();
    res.status(200).json({ message: "Member added", room });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove a member from a room
router.post("/:id/removeMember", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const { userId } = req.body;
    room.members = room.members.filter((member) => member.toString() !== userId);
    await room.save();
    res.status(200).json({ message: "Member removed", room });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
