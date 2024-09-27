// routes/postRoutes.js
const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

// Get all posts with pagination
router.get('/', postController.getAllPosts);

// Get post by ID
router.get('/:id', postController.getPostById);

module.exports = router;
