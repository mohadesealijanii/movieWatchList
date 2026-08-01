import { prisma } from "../config/db.js";

const addToWatchlist = async (req, res) => {
  const { movieId, status, rating, note } = req.body;

  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    return res.status(404).json({ error: "movie not found" });
  }

  const existInWatchlist = await prisma.watchListItem.findUnique({
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

  const watchListItem = await prisma.watchListItem.create({
    data: {
      userId: req.user?.id,
      movieId,
      status: status || "PLANNED",
      rating,
      note,
    },
  });

  res.status(201).json({
    status: "success",
    data: {
      watchListItem,
    },
  });
};

const removeFromWatchlist = async (req, res) => {
  const watchListItem = await prisma.watchListItem.findUnique({
    where: { id: req.params.id },
  });
  if (!watchListItem) {
    return res.status(401).json({ error: "watchlist item not found!" });
  }

  if (watchListItem.userId !== req.user?.id) {
    return res
      .status(403)
      .json({ error: "not allowed to delete this watchlist!" });
  }

  await prisma.watchListItem.delete({
    where: { id: req.params.id },
  });

  res.status(201).json({
    status: "success",
    data: {
      watchListItem,
    },
  });
};
const updateWatchlist = async (req, res) => {
  const { status, rating, note } = req.body;

  const watchListItem = await prisma.watchListItem.findUnique({
    where: { id: req.params.id },
  });
  if (!watchListItem) {
    return res.status(401).json({ error: "watchlist item not found!" });
  }

  if (watchListItem.userId !== req.user?.id) {
    return res
      .status(403)
      .json({ error: "not allowed to update this watchlist!" });
  }

  const updateData = {};
  if (status !== undefined) updateData.status = status.toUpperCase();
  if (rating !== undefined) updateData.rating = rating;
  if (note !== undefined) updateData.note = note;

  const updatedItem = await prisma.watchListItem.update({
    where: { id: req.params.id },
    data: updateData,
  });

  res.status(201).json({
    status: "success",
    data: {
      updatedItem,
    },
  });
};

export { addToWatchlist, removeFromWatchlist, updateWatchlist };
