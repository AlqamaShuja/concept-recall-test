// routes/followerRoutes.js
const express = require('express');
const followerController = require('../controllers/followerController');

const router = express.Router();

// Get user's followers by user ID
router.get('/:id/followers', followerController.getUserFollowers);

// Get user's followings by user ID
router.get('/:id/following', followerController.getUserFollowings);

module.exports = router;