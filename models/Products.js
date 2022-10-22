import { Sequelize, STRING } from "sequelize";
import db from "../config/Database.js";
import Users from "./Users.js";

const { DataTypes } = Sequelize;

const Products = db.define(
  "products",
  {
    name: {
      type: DataTypes.STRING,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Products);
Products.belongsTo(Users, { foreignKey: "userId" });

export default Products;
