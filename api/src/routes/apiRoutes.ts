import { Router } from "express";
import * as productController from "../controllers/productController"

const productRoutes = Router();

productRoutes.post("/product", productController.createProduct);
productRoutes.get("/product", productController.getAllProducts);

export default productRoutes
