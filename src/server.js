import express from "express";
import { config } from "dotenv";
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import watchlistRoutes from "./routes/watchlistRoutes.js"
import { connectDB, disconnectDB } from "./config/db.js";

config()
connectDB()
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  next();
})

app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist", watchlistRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});
process.on("SIGTERM", (err) => {
  console.error("SIGTERM received:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});
