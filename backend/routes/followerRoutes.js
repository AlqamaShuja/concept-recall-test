const express = require('express');
const followerController = require('../controllers/followerController');

const router = express.Router();

router.get('/:id/follow-data', followerController.getUserFollowData);

module.exports = router;