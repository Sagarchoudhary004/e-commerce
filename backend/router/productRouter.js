import express from "express"
import { createProduct,getProducts,getProductById } from "../controller/productController.js"



const router = express.Router();
router.post("/", createProduct);
router.get("/getProducts",getProducts);
router.get("/:id",getProductById);


export default router