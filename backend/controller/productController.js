import { open, unlink } from "node:fs/promises";
import Product from "../models/ProductModel.js";
import { deleteImage, uploadImage } from "../utils/Cloudinary.js";

class RequestValidationError extends Error {}

const removeTemporaryFile = async (filePath) => {
  try {
    await unlink(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
};

const isRemoteImageUrl = (value) => {
  try {
    const url = new URL(value);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
};

const getSafeErrorMessage = (error) => {
  let message = error instanceof Error ? error.message : "Unknown error";

  for (const secret of [
    process.env.CLOUDINARY_API_SECRET,
    process.env.CLOUDINARY_API_KEY,
    process.env.MONGO_URI,
  ]) {
    if (secret) message = message.split(secret).join("[redacted]");
  }

  return message;
};

const hasValidImageSignature = async (filePath, mimeType) => {
  const file = await open(filePath, "r");

  try {
    const header = Buffer.alloc(12);
    const { bytesRead } = await file.read(header, 0, header.length, 0);
    const signature = header.subarray(0, bytesRead);

    if (mimeType === "image/jpeg") {
      return (
        signature[0] === 0xff && signature[1] === 0xd8 && signature[2] === 0xff
      );
    }
    if (mimeType === "image/png") {
      return signature
        .subarray(0, 8)
        .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    }
    if (mimeType === "image/webp") {
      return (
        signature.toString("ascii", 0, 4) === "RIFF" &&
        signature.toString("ascii", 8, 12) === "WEBP"
      );
    }
    if (mimeType === "image/gif") {
      const signatureText = signature.toString("ascii", 0, 6);
      return signatureText === "GIF87a" || signatureText === "GIF89a";
    }

    return false;
  } finally {
    await file.close();
  }
};

export const createProduct = async (req, res) => {
  const filePath = req.file?.path;
  let uploadedImage;
  let productCreated = false;

  try {
    const { productName, description, price, category, stock, image } =
      req.body;

    if (
      !productName ||
      !description ||
      price === undefined ||
      price === "" ||
      !category ||
      stock === undefined ||
      stock === ""
    ) {
      throw new RequestValidationError("All fields are required");
    }

    let imageUrl = image;
    let imagePublicId;

    if (filePath) {
      if (!(await hasValidImageSignature(filePath, req.file.mimetype))) {
        throw new RequestValidationError(
          "Uploaded file content is not a valid image",
        );
      }

      uploadedImage = await uploadImage(filePath);
      if (!uploadedImage.secure_url || !uploadedImage.public_id) {
        throw new Error("Cloudinary did not return the uploaded image details");
      }

      imageUrl = uploadedImage.secure_url;
      imagePublicId = uploadedImage.public_id;
      await removeTemporaryFile(filePath);
    } else if (!isRemoteImageUrl(image)) {
      throw new RequestValidationError(
        "Provide an image file or a valid image URL",
      );
    }

    const product = await Product.create({
      productName,
      description,
      price,
      category,
      stock,
      image: imageUrl,
      imagePublicId,
    });

    productCreated = true;
    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    const cleanupErrors = [];

    if (filePath) {
      try {
        await removeTemporaryFile(filePath);
      } catch (cleanupError) {
        cleanupErrors.push(cleanupError);
      }
    }

    if (!productCreated && uploadedImage?.public_id) {
      try {
        await deleteImage(uploadedImage.public_id);
      } catch (cleanupError) {
        cleanupErrors.push(cleanupError);
      }
    }

    if (cleanupErrors.length > 0) {
      console.error("Image cleanup failed:", cleanupErrors);
    }
    if (!(error instanceof RequestValidationError)) {
      console.error("Product creation failed:", {
        errorType: typeof error,
        name: error?.name,
        message: error?.message,
        stack: error?.stack,
        code: error?.code,
        http_code: error?.http_code,
        errorDetails: error,
      });
    }

    const cleanupFailed = cleanupErrors.length > 0;
    const statusCode =
      !cleanupFailed && error instanceof RequestValidationError ? 400 : 500;

    return res.status(statusCode).json({
      success: false,
      message: cleanupFailed
        ? "Image cleanup failed"
        : statusCode === 400
          ? error.message
          : "Product creation failed",
      ...(statusCode === 500 && process.env.NODE_ENV !== "production"
        ? { detail: getSafeErrorMessage(error) }
        : {}),
    });
  }
};
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      message: "Products retrieved successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json({
      message: "Product find successfully",
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
