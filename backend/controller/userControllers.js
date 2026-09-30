import User from "../models/userModels.js";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName ||!email || !password) {
      return res.status(400).json({
        message:"All fields are required"
      });
    }
    const existUser = await User.findOne({email});
    
    if (existUser) {
      return res.status(400).json({
        message:" email is alredy exist"
      })
      
    }


    const user = await User.create({
      fullName,
      email,
      password,
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
