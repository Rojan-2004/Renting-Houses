const { Like, Comment } = require('../models');

const likeComment = async (req, res) => {
  try {
    const { commentId } = req.body;
    const [like, created] = await Like.findOrCreate({
      where: { userId: req.user.id, commentId },
      defaults: { userId: req.user.id, commentId }
    });
    
    if (created) {
      // Increment like count on comment
      await Comment.increment('likeCount', { where: { id: commentId } });
      res.status(201).json(like);
    } else {
      res.json({ message: 'Comment already liked' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error liking comment', error: error.message });
  }
};

const unlikeComment = async (req, res) => {
  try {
    const deleted = await Like.destroy({
      where: { commentId: req.params.commentId, userId: req.user.id }
    });
    
    if (deleted) {
      // Decrement like count on comment
      await Comment.decrement('likeCount', { where: { id: req.params.commentId } });
      res.json({ message: 'Comment unliked' });
    } else {
      res.status(404).json({ message: 'Like not found or not authorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error unliking comment', error: error.message });
  }
};

module.exports = {
  likeComment,
  unlikeComment
};