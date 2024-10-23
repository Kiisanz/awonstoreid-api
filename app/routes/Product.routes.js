import express from "express";
import ProductController from "../controllers/Product.controller.js";
import PromoCodeController from "../controllers/PromoCode.controller.js";
const router = express.Router();

router.get("/:categorySlug", ProductController.getAllByCategory);
router.post("/category/new", ProductController.addProductCategory);
router.post("/new", ProductController.addProduct);
router.post("/item/new", ProductController.addItemToProduct);
router.post("/item/detail/new", ProductController.addItemDetail);
router.post("/items/:productSlug", ProductController.updateProductBySlug);
router.post("/promo-code/new", PromoCodeController.addPromoCode);

// router.post("/product/new", productHandler.addProduct);
// router.get("/product/category/:slug", productHandler.getProductByCategory);

export default router;
