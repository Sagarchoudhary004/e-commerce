import multer from "multer";

const upload = multer();

const storage = multer.diskStorage(
    {
        destination:"../uploads",
        filename:file.originalname`${Date.now()}`
    });
