// import express from "express";
// import { registerUser } from "../controller/userControllers.js";



//  const router = express.Router();    
//  router.Router("/register").post(registerUser);


//  export default router;


 import express from "express";
import { registerUser } from "../controller/userControllers.js";

const router = express.Router();

router.post("/register", registerUser);

export default router;