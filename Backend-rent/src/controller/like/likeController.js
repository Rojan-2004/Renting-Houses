import { Like, Comment } from '../../models/index.js';

export const likeComment = async (req, res) => {
  try {
    const { commentId } = req.body;
    const [like, created] = await Like.findOrCreate({
      where: { userId: req.user.id, commentId },
      defaults: { userId: req.user.id, commentId }
    });
    
    if (created) {
      res.status(201).json(like);
    } else {
      res.json({ message: 'Comment already liked' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error liking comment', error: error.message });
  }
};

export const unlikeComment = async (req, res) => {
  // Implement this if needed
};