import { User } from "../models/Users.js";
import { asyncHandler } from "../middleware/handler.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "Email already in use" });
  }
  const user = new User({ name, email, password });
  await user.save();
  const token = generateToken({
    id: user._id,
    role: user.role,
    name: user.name,
  });
  res
    .status(201)
    .json({ success: true, message: "User registered successfully", token });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials" });
  }
  const token = generateToken({
    id: user._id,
    role: user.role,
    name: user.name,
  });
  res.json({ success: true, message: "Login successful", token });
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  res.json({ success: true, user });
});
