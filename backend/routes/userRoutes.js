// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Get user by ID
router.get('/:id', userController.getUserById);

// Get user by ID with posts
router.get('/:id/posts', userController.getUserByIdWithPosts);

module.exports = router;
