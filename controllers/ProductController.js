import { Product } from "../models/Products.js";
import { asyncHandler } from "../middleware/handler.js";

export const makeProduct = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Access denied" });
  }
  const { name, description, price, category } = req.body;
  if (!name || !description || !price || !category) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  const product = new Product({ name, description, price, category });
  await product.save();
  res
    .status(201)
    .json({ success: true, message: "Product created successfully", product });
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json({ success: true, products });
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  res.json({ success: true, product });
});

export const updateProduct = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Access denied" });
  }
  const { name, description, price, category } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.category = category || product.category;
  await product.save();
  res.json({ success: true, message: "Product updated successfully", product });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Access denied" });
  }
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  await product.remove();
  res.json({ success: true, message: "Product deleted successfully" });
});
