import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
// import foodRoutes from "./routes/foodRoutes.js";
// import customerRoutes from "./routes/customerRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";

import { connectDB } from "./config/db.js";
import {
  notFound,
  errorHandler
} from "./middleware/errorHandler.js";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "100kb" }));

app.get("/api/health", async (req, res, next) => {
  try {
    await connectDB();
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    next(error);
  }
});

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use("/api/auth", authRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/foods", foodRoutes);
// app.use("/api/customers", customerRoutes);
// app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;