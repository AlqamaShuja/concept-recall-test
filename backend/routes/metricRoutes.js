
const router = require('express').Router();
const metricsController = require('../controllers/metricsController');

router.get('/', metricsController.getAppMetrics);

router.get('/over-time', metricsController.getUsersAndPostsOverTime);

module.exports = router;
