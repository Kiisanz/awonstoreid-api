import { DataTypes, Model } from "sequelize";
import sequelize from "../database/mysql.database.js";
import ItemDetail from "./ItemDetail.model.js";
import PromoCode from "./PromoCode.model.js";

class ProductPromo extends Model {}

ProductPromo.init(
  {
    itemId: {
      type: DataTypes.INTEGER,
      references: {
        model: ItemDetail,
        key: "itemDetailId",
      },
    },
    promoCodeId: {
      type: DataTypes.INTEGER,
      references: {
        model: PromoCode,
        key: "promoCodeId",
      },
    },
  },
  {
    freezeTableName: false,
    sequelize,
    modelName: "ProductPromo",
  }
);

export default ProductPromo;
