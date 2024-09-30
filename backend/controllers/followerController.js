const { Sequelize } = require('sequelize');
const { User, sequelize } = require('../models');

exports.getUserFollowData = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await sequelize.query(
      `SELECT * FROM get_user_follow_data(:userId)`,
      {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { userId: parseInt(userId) },
      }
    );

    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: "User not found or no followers/followings data." });
    }
  } catch (error) {
    console.error('Error fetching user follow data:', error);
    res.status(500).json({ error: 'Failed to fetch user follow data' });
  }
};