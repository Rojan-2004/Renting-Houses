const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Favorite = sequelize.define('Favorite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  timestamps: true
});

module.exports = Favorite;