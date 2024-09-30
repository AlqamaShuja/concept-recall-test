const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.get('/', postController.getPaginatedPostsWithUser);
router.get('/user/:userId', postController.getAllPostsOfUser);



module.exports = router;
