import express from "express"
import { createProduct,getProducts,getProductById } from "../controller/productController.js"
import { uploadProductImage } from "../middleware/uplod.js"



const router = express.Router();
router.post("/", uploadProductImage, createProduct);
router.get("/getProducts",getProducts);
router.get("/:id",getProductById);


export default router