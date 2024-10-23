import { DataTypes, Model } from "sequelize";
import sequelize from "../database/mysql.database.js";
import Item from "./Item.model.js";

class ItemDetail extends Model {}

ItemDetail.init(
  {
    itemDetailId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    itemId: {
      type: DataTypes.INTEGER,
      references: {
        model: Item,
        key: "itemId",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
      allowNull: true,
    },
    finalPrice: {
      type: DataTypes.VIRTUAL,
      get() {
        const price = this.getDataValue("price");
        const discount = this.getDataValue("discount") || 0;
        return price - price * (discount / 100).toFixed(2);
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: false,
    sequelize,
    modelName: "ItemDetail",
  }
);

export default ItemDetail;
