import Product from "../models/ProductModel.js";

export const createProduct = async (req, res) => {
  try {
    const { productName, description, price, category, stock, image } =
      req.body;

       if (!productName || !description || !price || !category || !image) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const product = await Product.create({
      productName,
      description,
      price,
      category,
      stock,
      image,
    });

    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
