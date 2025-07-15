import { Comment, User } from '../../models/index.js';

export const createComment = async (req, res) => {
  try {
    const { content, rating } = req.body;
    const comment = await Comment.create({
      content,
      rating,
      userId: req.user.id
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment', error: error.message });
  }
};

export const getCommentsForProperty = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { propertyId: req.params.propertyId },
      include: [{ model: User, attributes: ['name', 'id'] }]
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const [updated] = await Comment.update(req.body, {
      where: { id: req.params.id, userId: req.user.id }
    });
    if (updated) {
      const updatedComment = await Comment.findByPk(req.params.id);
      res.json(updatedComment);
    } else {
      res.status(404).json({ message: 'Comment not found or not authorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment', error: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const deleted = await Comment.destroy({
      where: { id: req.params.id, userId: req.user.id }
    });
    if (deleted) {
      res.json({ message: 'Comment deleted' });
    } else {
      res.status(404).json({ message: 'Comment not found or not authorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error: error.message });
  }
};