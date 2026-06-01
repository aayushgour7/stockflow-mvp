const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const Setting = sequelize.define(
  "Setting",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    defaultLowStockThreshold: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },
  },
  {
    tableName: "settings",
  }
);

module.exports = Setting;