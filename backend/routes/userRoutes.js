const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getUserList);

router.get('/:id', userController.getUserById);

router.get('/:id/growth-followers-post', userController.getUserGrowthOverTime);

module.exports = router;
