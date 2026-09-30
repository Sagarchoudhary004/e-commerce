import User from "../models/userModels.js";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

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
