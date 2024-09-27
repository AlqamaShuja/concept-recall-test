const { sequelize } = require('../models');
const { Sequelize } = require('sequelize');

// Route to get overall app metrics
exports.getAppMetrics = async (req, res) => {
  try {
    const result = await sequelize.query(`SELECT * FROM get_overall_app_metrics()`, { type: Sequelize.QueryTypes.SELECT });
    return res.json(result[0]);
  } catch (error) {
    console.error('Error fetching app metrics:', error);
    return res.status(500).json({ error: error.message });
  }
};

