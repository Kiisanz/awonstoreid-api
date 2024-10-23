import { DataTypes, Model } from "sequelize";
import sequelize from "../database/mysql.database.js";
import Category from "./Category.model.js";

class Product extends Model {}

Product.init(
  {
    productId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productProvider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "categoryId",
      },
    },
  },
  { freezeTableName: false, sequelize, modelName: "Product" }
);

export default Product;
