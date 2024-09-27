// controllers/userController.js
const { User } = require('../models');

// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
};

// Get User by ID with Posts
exports.getUserByIdWithPosts = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: ['Posts']
    });
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
};
