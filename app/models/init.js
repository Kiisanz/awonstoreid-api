import Product from "./Product.model.js";
import Category from "./Category.model.js";
import Item from "./Item.model.js";
import ItemDetail from "./ItemDetail.model.js";
import PromoCode from "./PromoCode.model.js";
import ProductPromo from "./ProductPromo.model.js";

const model = {};

model.Product = Product;
model.Category = Category;
model.Item = Item;
model.ItemDetail = ItemDetail;
model.PromoCode = PromoCode;
model.ProductPromo = ProductPromo;

model.Product.belongsTo(model.Category, {
  foreignKey: "categoryId",
});

model.Category.hasMany(model.Product, {
  foreignKey: "categoryId",
});

model.Item.belongsTo(model.Product, {
  foreignKey: "productId",
});

model.Product.hasMany(model.Item, {
  foreignKey: "productId",
});

model.ItemDetail.belongsTo(model.Item, {
  foreignKey: "itemId",
});

model.Item.hasMany(model.ItemDetail, {
  foreignKey: "itemId",
});

model.ItemDetail.belongsToMany(model.PromoCode, {
  through: model.ProductPromo,
  foreignKey: "itemDetailId",
});
model.PromoCode.belongsToMany(model.ItemDetail, {
  through: model.ProductPromo,
  foreignKey: "promoCodeId",
});

export default model;
