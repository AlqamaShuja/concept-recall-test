// controllers/postController.js
const { Post } = require('../models');

// Get all posts with pagination
exports.getAllPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const posts = await Post.findAndCountAll({
      limit,
      offset
    });
    res.json({
      total: posts.count,
      page,
      limit,
      data: posts.rows
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Get Post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).send("Post not found");
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post data' });
  }
};
