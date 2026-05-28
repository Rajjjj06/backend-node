import express from "express";
import {
  makeProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductController.js";
import { adminMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", adminMiddleware, makeProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", adminMiddleware, updateProduct);
router.delete("/:id", adminMiddleware, deleteProduct);

export default router;
