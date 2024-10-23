import { DataTypes, Model } from "sequelize";
import sequelize from "../database/mysql.database.js";

class PromoCode extends Model {}

PromoCode.init(
  {
    promoCodeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    discountType: {
      type: DataTypes.ENUM("percentage", "cashback", "item"),
      allowNull: false,
    },
    discountValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: false,
    sequelize,
    modelName: "PromoCode",
  }
);

export default PromoCode;
