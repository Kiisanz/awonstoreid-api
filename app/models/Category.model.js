import sequelize from "../database/mysql.database.js";
import { DataTypes, Model } from "sequelize";

class Category extends Model {}

Category.init(
  {
    categoryId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: false,
    sequelize,
    modelName: "Category",
  }
);

export default Category;
