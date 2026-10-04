import express from "express";

import { registerUser } from "../controller/userControllers.js";
import {loginUser} from "../controller/userControllers.js";
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/register", registerUser);
router.post("/login",loginUser)
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Profile accessed successfully",
    user: req.user
  });
});
export default router;
