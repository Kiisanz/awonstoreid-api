import model from "../models/init.js";
import { ResourceNotFoundError } from "./Erorrs.Helper.js";

async function findCategoryByName(categoryName) {
  const category = await model.Category.findOne({
    where: { categoryName },
  });
  if (!category) {
    throw new ResourceNotFoundError(
      `Category ${categoryName} not found.`,
      [],
      "Check the spelling of the category name you entered"
    );
  }
  return category;
}

async function findCategoryBySlug(categorySlug) {
  const category = await model.Category.findOne({
    where: { slug: categorySlug },
  });
  if (!category) {
    throw new ResourceNotFoundError(`Category ${categorySlug} not found.`);
  }
  return category;
}

async function findProductByName(productName) {
  const product = await model.Product.findOne({ where: { productName } });
  if (!product) {
    throw new ResourceNotFoundError(
      `Product ${productName} not found.`,
      [],
      "Check the spelling of the product name you entered"
    );
  }
  return product;
}
async function findProductBySlug(productSlug) {
  const product = await model.Product.findOne({ where: { slug: productSlug } });
  if (!product) {
    throw new ResourceNotFoundError(
      `Product ${productSlug} not found.`,
      [],
      "Check the spelling of the product name you entered"
    );
  }
  return product;
}
async function findItemInProductByName(itemName, productName) {
  const product = await findProductByName(productName);
  const item = await model.Item.findOne({ where: { itemName } });
  if (!item) {
    throw new ResourceNotFoundError(
      `Item ${itemName} in Product ${product.productName} not found.`,
      [],
      "Check the spelling of the item name you entered"
    );
  }
  return item;
}

export {
  findCategoryByName,
  findCategoryBySlug,
  findProductByName,
  findItemInProductByName,
  findProductBySlug,
};
