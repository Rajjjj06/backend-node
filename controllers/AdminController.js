import { User } from "../models/Users.js";
import { asyncHandler } from "../middleware/handler.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Access denied" });
  }
  const users = await User.find();
  res.json({ success: true, users });
});
