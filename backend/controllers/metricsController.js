const { sequelize, Post, User } = require('../models');
const { Sequelize } = require('sequelize');
const { Op } = Sequelize;

exports.getAppMetrics = async (req, res) => {
  try {
    const result = await sequelize.query(`SELECT * FROM get_overall_app_metrics()`, { type: Sequelize.QueryTypes.SELECT });
    return res.json(result[0]);
  } catch (error) {
    console.error('Error fetching app metrics:', error);
    return res.status(500).json({ error: error.message });
  }
};


exports.getUsersAndPostsOverTime = async (req, res) => {
  try {
    // Define the time range (last 10 days)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 10);

    const usersAdded = await User.findAll({
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'date'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      where: {
        createdAt: {
          [Op.gte]: startDate
        }
      },
      group: [Sequelize.fn('DATE', Sequelize.col('createdAt'))],
      order: [[Sequelize.fn('DATE', Sequelize.col('createdAt')), 'ASC']]
    });

    const postsAdded = await Post.findAll({
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'date'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      where: {
        createdAt: {
          [Op.gte]: startDate
        }
      },
      group: [Sequelize.fn('DATE', Sequelize.col('createdAt'))],
      order: [[Sequelize.fn('DATE', Sequelize.col('createdAt')), 'ASC']]
    });

    res.json({ usersAdded, postsAdded });
  } catch (error) {
    console.error('Error fetching users and posts over time:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

