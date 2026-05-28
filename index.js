import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import userRoutes from "./routes/UserRoute.js";
import adminRoutes from "./routes/AdminRoute.js";
import productRoutes from "./routes/ProductRoute.js";

connectDB();

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);

app.get("/health", (req, res) => {
  res.json({ success: true, message: "API is healthy" });
});

app.get("/ready", (req, res) => {
  res.json({ success: true, message: "API is ready" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
