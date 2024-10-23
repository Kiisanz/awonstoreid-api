import { DataTypes, Model } from "sequelize";
import sequelize from "../database/mysql.database.js";
import Product from "./Product.model.js";

class Item extends Model {}

Item.init(
  {
    itemId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "productId",
      },
    },
  },
  {
    freezeTableName: false,
    sequelize,
    modelName: "Items",
  }
);

export default Item;
