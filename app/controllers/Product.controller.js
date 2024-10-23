import model from "../models/init.js";
import slugify from "slugify";
import {
  ResourceNotFoundError,
  ValidationError,
} from "../helpers/Erorrs.Helper.js";
import productData from "../helpers/dtos/ProductDTO.js";
import HTTP_STATUS from "../helpers/HTTPStatus.Helper.js";
import validateRequest from "../helpers/validateRequest.helper.js";
import {
  findCategoryByName,
  findCategoryBySlug,
  findItemInProductByName,
  findProductByName,
  findProductBySlug,
} from "../helpers/Find.Helper.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class ProductController {
  static async addProductCategory(req, res, next) {
    const { categoryName } = req.body;
    try {
      const newCategory = model.Category.build({
        categoryName,
        slug: slugify(categoryName, { lower: true }),
      });
      await newCategory.save();
      return res.success(
        newCategory,
        "created",
        HTTP_STATUS.CREATED,
        `${categoryName} category has been successfully added.`
      );
    } catch (error) {
      next(error);
    }
  }
  static async getAllByCategory(req, res, next) {
    const { categorySlug } = req.params;

    try {
      const category = await findCategoryBySlug(categorySlug);

      const products = await model.Product.findAll({
        where: {
          categoryId: category.categoryId,
        },
        include: [
          {
            model: model.Category,
            attributes: ["categoryName"],
          },
          {
            model: model.Item,
            include: [
              {
                model: model.ItemDetail,
                attributes: [
                  "quantity",
                  "price",
                  "finalPrice",
                  "discount",
                  "finalPrice",
                ],
              },
            ],
            attributes: ["itemName", "itemImage"],
          },
        ],
        attributes: ["productId", "productName", "slug", "productImage"],
      });

      const modifiedProducts = products.map((product) => {
        const productCopy = JSON.parse(JSON.stringify(product.dataValues));
        productCopy.Items.forEach((item) => {
          item.ItemDetails.forEach((detail) => {
            detail.price = parseInt(detail.price);
            detail.discount = parseFloat(detail.discount);
          });
        });

        return productCopy;
      });

      if (modifiedProducts.length > 0) {
        return res.success(
          productData(modifiedProducts),
          "OK",
          HTTP_STATUS.OK,
          `successfully retrieved all products for category ${categorySlug}`
        );
      } else {
        throw new ResourceNotFoundError(
          `There are no products in the ${categorySlug} category`,
          [],
          "Try searching for other products with similar keywords or related categories."
        );
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateProductBySlug(req, res, next) {
    try {
      const { productSlug } = req.params;
      const product = await findProductBySlug(productSlug);
      product.productName = "ff";
      const updatedProduct = await product.save();
      return res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (e) {
      throw e;
    }
  }

  static async addProduct(req, res, next) {
    try {
      const { productName, categoryName, productImage, productProvider } =
        req.body;
      const filePath = path.join(__dirname, "public/images", productImage);

      validateRequest(
        ["productName", "categoryName", "productProvider", "productImage"],
        req.body
      );
      const category = await findCategoryByName(categoryName);
      const newProduct = await model.Product.build({
        productName,
        slug: slugify(productName, { lower: true }),
        categoryId: category.categoryId,
        productImage: filePath,
        productProvider,
      });
      await newProduct.save();

      return res.success(
        newProduct,
        "created",
        HTTP_STATUS.CREATED,
        `${productName} product has been successfully added.`
      );
    } catch (error) {
      next(error);
    }
  }

  static async addItemToProduct(req, res, next) {
    try {
      const { itemName, productName, itemImage } = req.body;
      validateRequest(["itemName", "productName", "itemImage"], req.body);

      const product = await findProductByName(productName);
      const newItem = await model.Item.build({
        itemName,
        slug: slugify(itemName, { lower: true }),
        productId: product.productId,
        itemImage,
      });
      await newItem.save();

      return res.success(
        newItem,
        "created",
        HTTP_STATUS.CREATED,
        `${itemName} item has been successfully added to ${product.productName}.`
      );
    } catch (error) {
      next(error);
    }
  }

  static async addItemDetail(req, res, next) {
    try {
      const { quantity, productName, itemName, price, discount } = req.body;
      validateRequest(
        ["quantity", "productName", "itemName", "price"],
        req.body
      );

      const item = await findItemInProductByName(itemName, productName);
      const newItemDetail = await model.ItemDetail.build({
        price,
        quantity,
        discount,
        slug: slugify(productName, { lower: true }),
        itemId: item.itemId,
      });
      await newItemDetail.save();

      return res.success(
        newItemDetail,
        "created",
        HTTP_STATUS.CREATED,
        `Item detail has been successfully added to ${item.itemName} item in ${productName} product`
      );
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
