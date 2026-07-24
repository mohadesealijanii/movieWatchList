import { prisma } from "../config/db.js"


const addToWatchlist = async (req, res) => {
    const { movieId, status, rating, note } = req.body
    

    const movie = await prisma.movie.findUnique({
        where: {id: movieId}
    })
    if (!movie) {
        return res.status(404).json({ error: "movie not found"})
    }
    const existInWatchlist = await prisma.watchListItem.findFirst({
        where: {
            userId_movieId: {
                userId: req.user.id,
                movieId
            } }
        })
    if (existInWatchlist) {
            return res.status(400).json({ error: "movie already exists in watchlist"})
    }
    
    const watchlistItem = await prisma.watchListItem.create({
        data: {
            userId: req.user.id,
            movieId,
            status: status || "PLANNED",
            rating,
            note
        }
    })
    res.status(201).json({
        status: "success",
        data: {
            watchlistItem
        }
    })
} 

export { addToWatchlist }