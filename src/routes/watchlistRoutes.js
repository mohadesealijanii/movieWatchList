import express from "express";
import {
  addToWatchlist,
  removeFromWatchlist,
  updateWatchlist,
} from "../controllers/watchlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { prisma } from "../config/db.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { watchlistItemSchema } from "../validators/watchlistValidators.js";

const router = express.Router();
router.use(authMiddleware);
router.post("/", validateRequest(watchlistItemSchema), addToWatchlist);

router.delete("/:id", removeFromWatchlist);
router.put("/:id", validateRequest(watchlistItemSchema), updateWatchlist);
export default router;
