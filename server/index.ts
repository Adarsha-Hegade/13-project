import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; // Add this import
import { config } from "./config/env";
import { connectToDatabase } from "./config/database";
import { authRouter } from "./routes/auth";
import { productsRouter } from "./routes/products";
import { errorHandler } from "./middleware/error";
import { auth } from "./config/auth";

const __filename = fileURLToPath(import.meta.url); // Resolve filename
const __dirname = path.dirname(__filename); // Resolve directory

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); // Use the resolved __dirname
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use(errorHandler);

async function startServer() {
  try {
    await auth.init();
    console.log("✅ Auth system initialized");
    await connectToDatabase();
    console.log("✅ Database connected");
    const port = config.server.port;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

export default app;
