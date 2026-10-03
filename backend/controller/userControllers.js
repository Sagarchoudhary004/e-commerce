import User from "../models/userModels.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"


export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({
        message: " email is alredy exist",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

      const existMail = await User.findOne({ email });

      if (!existMail) {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }

      

      const isPasswordCorrect = await bcryptjs.compare(
        password,
        existMail.password
      );

      const tokenData = {
        id:existMail._id
      }
      

     if (isPasswordCorrect) {
      
        const token = await jwt.sign(tokenData,process.env.JWT_SECRET)

       return res.status(200).json({
          message: "welcome",
          token: token,

        })
     } else {
      return res.status(400).json({
          message: "Invalid email or password",
        })
     }
  } catch (error) {
    console.log(error);
  }
};
