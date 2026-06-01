const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    sku: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
    },

    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    costPrice: {
      type: DataTypes.DECIMAL(10, 2),
    },

    sellingPrice: {
      type: DataTypes.DECIMAL(10, 2),
    },

    lowStockThreshold: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "products",
  }
);

module.exports = Product;