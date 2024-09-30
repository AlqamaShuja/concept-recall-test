const { Post, User } = require('../models'); 

exports.getAllPostsOfUser = async (req, res) => {
  const { userId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    const posts = await Post.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      offset: (page - 1) * limit, 
      limit: parseInt(limit),
    });

    const totalPosts = await Post.count({ where: { userId } });

    res.status(200).json({
      posts,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalPosts / limit),
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Failed to fetch posts', error });
  }
};

exports.getPaginatedPostsWithUser = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const { count, rows: posts } = await Post.findAndCountAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'avatar'],
        },
      ],
      order: [['createdAt', 'DESC']],
      offset: (page - 1) * limit, 
      limit: parseInt(limit), 
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      posts,
      currentPage: parseInt(page),
      totalPages,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Failed to fetch posts', error });
  }
};