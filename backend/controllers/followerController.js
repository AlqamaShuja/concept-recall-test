// controllers/followerController.js
const { User } = require('../models');

// Get User's Followers
exports.getUserFollowers = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: User, as: 'Followers' }]
    });
    if (!user) return res.status(404).send("User not found");
    res.json(user.Followers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch followers' });
  }
};

// Get User's Followings
exports.getUserFollowings = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: User, as: 'Following' }]
    });
    if (!user) return res.status(404).send("User not found");
    res.json(user.Following);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch followings' });
  }
};