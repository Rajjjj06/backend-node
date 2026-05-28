import express from "express";
import { getAllUsers } from "../controllers/AdminController.js";
import { adminMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/users", adminMiddleware, getAllUsers);

export default router;
