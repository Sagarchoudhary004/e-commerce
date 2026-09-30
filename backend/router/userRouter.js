import express from "express";

import { registerUser } from "../controller/userControllers.js";
import {loginUser} from "../controller/userControllers.js"

const router = express.Router();

router.post("/register", registerUser);
router.post("/login",loginUser)

export default router;
