import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.js";

export const Like = sequelize.define('Like', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  timestamps: true
});