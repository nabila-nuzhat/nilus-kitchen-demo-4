/** NOTES:
 * 
 * express() creates the application.
 * cors() controls which frontend origin may make browser requests.
 * express.json() parses JSON request bodies.
 * /api/health checks the database connection.
 * app.use() attaches middleware and routes.
 * notFound handles unmatched URLs.\
 * errorHandler is registered last so errors can reach it.
 * 
 * The database connection middleware runs before the business routes. This ensures those routes do not attempt database operations before connecting.
    
 * 
 */

import express from "express";
import cors from "cors";

// Routes
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// db 
import { connectDB } from "./config/db.js";
import {
  notFound,
  errorHandler
} from "./middleware/errorHandler.js";

// initiating express app
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PATCH", "DELETE"], // ???
  allowedHeaders: ["Content-Type", "Authorization"] // ???
}));

// check for updates

app.use(express.json({ limit: "100kb" }));

// MORE DEEP DIVE - health check
// http://localhost:5000/api/health
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
app.use("/api/categories", categoryRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;