const express = require('express');
const router = express.Router();

const chatRoutes = require('./chatRoutes');
const roomRoutes = require('./roomRoutes');
const userRoutes = require('./userRoutes');

router.use('/chat', chatRoutes);
router.use('/room', roomRoutes);
router.use('/user', userRoutes);

module.exports = router;
