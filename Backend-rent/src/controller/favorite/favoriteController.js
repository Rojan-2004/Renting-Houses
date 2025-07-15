import { Favorite } from '../../models/index.js';

export const addToFavorites = async (req, res) => {
  try {
    const [favorite, created] = await Favorite.findOrCreate({
      where: { userId: req.user.id },
      defaults: { userId: req.user.id }
    });
    
    if (created) {
      res.status(201).json(favorite);
    } else {
      res.json({ message: 'Already in favorites' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding to favorites', error: error.message });
  }
};

// Add other controller functions here and export them as needed