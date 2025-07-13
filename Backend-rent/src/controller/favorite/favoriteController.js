const { Favorite, Property } = require('../models');

const addToFavorites = async (req, res) => {
  try {
    const { propertyId } = req.body;
    const [favorite, created] = await Favorite.findOrCreate({
      where: { userId: req.user.id, propertyId },
      defaults: { userId: req.user.id, propertyId }
    });
    
    if (created) {
      res.status(201).json(favorite);
    } else {
      res.json({ message: 'Property already in favorites' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding to favorites', error: error.message });
  }
};

const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.findAll({
      where: { userId: req.user.id },
      include: [{ model: Property }]
    });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites', error: error.message });
  }
};

const removeFromFavorites = async (req, res) => {
  try {
    const deleted = await Favorite.destroy({
      where: { id: req.params.id, userId: req.user.id }
    });
    if (deleted) {
      res.json({ message: 'Removed from favorites' });
    } else {
      res.status(404).json({ message: 'Favorite not found or not authorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing favorite', error: error.message });
  }
};

module.exports = {
  addToFavorites,
  getFavorites,
  removeFromFavorites
};