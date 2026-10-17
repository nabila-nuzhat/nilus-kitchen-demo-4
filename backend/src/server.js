import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

try {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Nilus Kitchen API running on port ${PORT}`);
  });
} catch (error) {
  console.error("Failed to start backend:", error.message);
  process.exit(1);
}