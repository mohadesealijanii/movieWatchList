import express from "express";
import { config } from "dotenv";
import movieRoutes from "./routes/movieRoutes.js";
import { connectDB, disconnectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"

config()
connectDB()
const app = express();

app.get("/hello", (req, res) => {
  res.json({ message: "Hello World!" });
});
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.url);
  console.log(req.headers["content-type"]);
  console.log(req.body);
  next();
})
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);

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
