import { v2 as cloudinary } from "cloudinary";

const configureCloudinary = () => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary environment variables are not configured");
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });
};

export const uploadImage = async (filePath) => {
  configureCloudinary();
  return cloudinary.uploader.upload(filePath, {
    folder: "e-commerce/products",
    resource_type: "image",
  });
};

export const deleteImage = async (publicId) => {
  configureCloudinary();
  return cloudinary.uploader.destroy(publicId, { resource_type: "image" });
};