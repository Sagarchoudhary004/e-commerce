import express from "express"
import { createProduct,getProducts } from "../controller/productController.js"



const router = express.Router();
router.post("/", createProduct);
router.get("/getProducts",getProducts);


export default router