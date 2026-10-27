import multer from "multer";
import { mkdir } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";

const uploadDirectory = fileURLToPath(new URL("../uploads/", import.meta.url));
const maxFileSize = 5 * 1024 * 1024;
const allowedImageTypes = new Map([
  ["image/jpeg", { extensions: [".jpg", ".jpeg"], storedExtension: ".jpg" }],
  ["image/png", { extensions: [".png"], storedExtension: ".png" }],
  ["image/webp", { extensions: [".webp"], storedExtension: ".webp" }],
  ["image/gif", { extensions: [".gif"], storedExtension: ".gif" }],
]);

class UnsupportedImageTypeError extends Error {}

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    mkdir(uploadDirectory, { recursive: true })
      .then(() => callback(null, uploadDirectory))
      .catch(callback);
  },
  filename: (_req, file, callback) => {
    const imageType = allowedImageTypes.get(file.mimetype);
    callback(null, `${randomUUID()}${imageType.storedExtension}`);
  },
});

export const uploads = multer({
  storage,
  limits: {
    fileSize: maxFileSize,
    files: 1,
  },
  fileFilter: (_req, file, callback) => {
    const imageType = allowedImageTypes.get(file.mimetype);
    const extension = file.originalname
      .slice(file.originalname.lastIndexOf("."))
      .toLowerCase();

    if (!imageType || !imageType.extensions.includes(extension)) {
      return callback(
        new UnsupportedImageTypeError(
          "Only JPEG, PNG, WEBP, and GIF images are allowed"
        )
      );
    }

    callback(null, true);
  },
});

export const uploadProductImage = (req, res, next) => {
  uploads.single("image")(req, res, (error) => {
    if (!error) {
      return next();
    }

    if (
      error instanceof multer.MulterError ||
      error instanceof UnsupportedImageTypeError
    ) {
      return res.status(400).json({ message: error.message });
    }

    console.error("Temporary image upload failed:", error);
    return res.status(500).json({ message: "Image upload failed" });
  });
};
