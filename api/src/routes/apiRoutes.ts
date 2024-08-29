import { Router } from "express";
import * as productController from "../controllers/productController"

const productRoutes = Router();

productRoutes.post("/product", productController.createProduct);
productRoutes.get("/product", productController.getAllProducts);
productRoutes.delete("/product", productController.deleteProducts);
productRoutes.put("/product", productController.updateProduct);

export default productRoutes
