import { prisma } from "../config/db.js";

const addToWatchlist = async (req, res) => {
  const { movieId, status, rating, note } = req.body;

  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });
  if (!movie) {
    return res.status(404).json({ error: "movie not found" });
  }
  const existInWatchlist = await prisma.watchListItem.findFirst({
    where: {
      userId_movieId: {
        userId: req.user.id,
        movieId,
      },
    },
  });
  if (existInWatchlist) {
    return res.status(400).json({ error: "movie already exists in watchlist" });
  }

  const watchlistItem = await prisma.watchListItem.create({
    data: {
      userId: req.user.id,
      movieId,
      status: status || "PLANNED",
      rating,
      note,
    },
  });
  res.status(201).json({
    status: "success",
    data: {
      watchlistItem,
    },
  });
};
const removeFromWatchlist = async (req, res) => {
  const watchlistItem = await prisma.watchListItem.findUnique({
    where: { id: req.params.id },
  });
  if (!watchlistItem) {
    return res.status(401).json({ error: "watchlist item not found!" });
  }

  if (watchlistItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "not allowed to update this watchlist!" });
  }

  await prisma.watchlistItem.delete({
    where: { id: req.params.id },
  });

  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });
  if (!movie) {
    return res.status(404).json({ error: "movie not found" });
  }
  const existInWatchlist = await prisma.watchListItem.findFirst({
    where: {
      userId_movieId: {
        userId: req.user.id,
        movieId,
      },
    },
  });
  if (existInWatchlist) {
    return res.status(400).json({ error: "movie already exists in watchlist" });
  }

  const watchlistItem = await prisma.watchListItem.create({
    data: {
      userId: req.user.id,
      movieId,
      status: status || "PLANNED",
      rating,
      note,
    },
  });
  res.status(201).json({
    status: "success",
    data: {
      watchlistItem,
    },
  });
};

export { addToWatchlist };
