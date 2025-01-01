const express = require('express');
const mongoose = require('mongoose'); // Import mongoose
const dotenv = require('dotenv'); // Import dotenv
const routes = require('./routes');

const app = express();
const PORT = 5000;

dotenv.config();

// Middleware to parse JSON
app.use(express.json());

app.use('/api', routes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
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
