const { Op, Sequelize } = require('sequelize');
const { User, Follower, Post } = require('../models');

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
};

exports.getUserList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    // Get users with pagination
    const { rows: users, count } = await User.findAndCountAll({
      limit: limit,
      offset: offset,
    });

    // Return paginated response
    res.json({
      users,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalUsers: count,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};


exports.getUserGrowthOverTime = async (req, res) => {
  try {
    const userId = req.params.id;

    // Calculate the start date: 10 days ago from today
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 10); // Set start date to 10 days ago

    // Fetch followers count over the last 10 days
    const followersOverTime = await Follower.findAll({
      where: {
        followingId: userId,
        createdAt: { [Op.gte]: startDate }
      },
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'date'],
        [Sequelize.fn('COUNT', Sequelize.col('followerId')), 'followers']
      ],
      group: ['date'],
      order: [['date', 'ASC']]
    });

    // Fetch followings count over the last 10 days
    const followingsOverTime = await Follower.findAll({
      where: {
        followerId: userId,
        createdAt: { [Op.gte]: startDate }
      },
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'date'],
        [Sequelize.fn('COUNT', Sequelize.col('followingId')), 'followings']
      ],
      group: ['date'],
      order: [['date', 'ASC']]
    });

    // Fetch posts count over the last 10 days
    const postsOverTime = await Post.findAll({
      where: {
        userId: userId,
        createdAt: { [Op.gte]: startDate }
      },
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'date'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'posts']
      ],
      group: ['date'],
      order: [['date', 'ASC']]
    });

    res.json({ followersOverTime, followingsOverTime, postsOverTime });
  } catch (error) {
    console.error('Error fetching growth over time:', error);
    res.status(500).json({ error: 'Failed to fetch growth data' });
  }
};


