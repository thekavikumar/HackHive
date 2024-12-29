const express = require('express');
const mongoose = require('mongoose'); // Import mongoose

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB URI
const MONGODB_URI = 'mongodb://localhost:27017/hackhive';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Example Route
app.get('/', (req, res) => {
  res.send('Server is running and connected to MongoDB');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
