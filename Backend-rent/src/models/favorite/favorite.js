import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.js";

export const Favorite = sequelize.define('Favorite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  timestamps: true
});