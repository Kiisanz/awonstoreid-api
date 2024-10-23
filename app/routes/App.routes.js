import express from "express";
import ProductRoutes from "./Product.routes.js";

const router = express.Router();

router.use(`/product`, ProductRoutes);

export default router;
