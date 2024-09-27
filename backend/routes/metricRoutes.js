
const router = require('express').Router();
const metricsController = require('../controllers/metricsController');

// Route to get overall app metrics
router.get('/', metricsController.getAppMetrics);

module.exports = router;
