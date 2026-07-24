import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const userId = '73fbc92e-73b8-497c-89ac-bd0f0204887f'

const movies = [
    {
        title: "Inception",
        overview:
            "A skilled thief enters people's dreams to steal secrets but is offered a chance at redemption by planting an idea instead.",
        releaseYear: 2010,
        genres: ["Action", "Sci-Fi", "Thriller"],
        runtime: 148,
        posterUrl: "https://example.com/posters/inception.jpg",
        createdBy: userId,
    },
    {
        title: "The Dark Knight",
        overview:
            "Batman faces the Joker, a criminal mastermind determined to plunge Gotham City into chaos.",
        releaseYear: 2008,
        genres: ["Action", "Crime", "Drama"],
        runtime: 152,
        posterUrl: "https://example.com/posters/the-dark-knight.jpg",
        createdBy: userId,
    },
    {
        title: "Interstellar",
        overview:
            "A team of astronauts travels through a wormhole in search of a new home for humanity.",
        releaseYear: 2014,
        genres: ["Adventure", "Drama", "Sci-Fi"],
        runtime: 169,
        posterUrl: "https://example.com/posters/interstellar.jpg",
        createdBy: userId,
    },
    {
        title: "The Matrix",
        overview:
            "A hacker discovers reality is a simulation and joins a rebellion against intelligent machines.",
        releaseYear: 1999,
        genres: ["Action", "Sci-Fi"],
        runtime: 136,
        posterUrl: "https://example.com/posters/the-matrix.jpg",
        createdBy: userId,
    },
    {
        title: "Parasite",
        overview:
            "A poor family infiltrates the lives of a wealthy household with unexpected consequences.",
        releaseYear: 2019,
        genres: ["Drama", "Thriller"],
        runtime: 132,
        posterUrl: "https://example.com/posters/parasite.jpg",
        createdBy: userId,
    },
    {
        title: "The Shawshank Redemption",
        overview:
            "Two imprisoned men form a lasting friendship while finding hope behind prison walls.",
        releaseYear: 1994,
        genres: ["Drama"],
        runtime: 142,
        posterUrl: "https://example.com/posters/shawshank.jpg",
        createdBy: userId,
    },
    {
        title: "The Lord of the Rings: The Fellowship of the Ring",
        overview:
            "A young hobbit begins a perilous journey to destroy a powerful ring before evil claims it.",
        releaseYear: 2001,
        genres: ["Adventure", "Fantasy"],
        runtime: 178,
        posterUrl: "https://example.com/posters/fellowship.jpg",
        createdBy: userId,
    },
    {
        title: "Avengers: Endgame",
        overview:
            "The Avengers unite for one final mission to reverse the devastation caused by Thanos.",
        releaseYear: 2019,
        genres: ["Action", "Adventure", "Sci-Fi"],
        runtime: 181,
        posterUrl: "https://example.com/posters/endgame.jpg",
        createdBy: userId,
    },
    {
        title: "Whiplash",
        overview:
            "An ambitious jazz drummer pushes himself to the limit under the guidance of a demanding instructor.",
        releaseYear: 2014,
        genres: ["Drama", "Music"],
        runtime: 106,
        posterUrl: "https://example.com/posters/whiplash.jpg",
        createdBy: userId,
    },
    {
        title: "Spider-Man: Into the Spider-Verse",
        overview:
            "Teenager Miles Morales teams up with Spider-People from different dimensions to save the multiverse.",
        releaseYear: 2018,
        genres: ["Animation", "Action", "Adventure"],
        runtime: 117,
        posterUrl: "https://example.com/posters/spider-verse.jpg",
        createdBy: userId,
    },
];

const main = async () => {
    for (const movie of movies) {
        await prisma.movie.create({
            data: movie
        })
        console.log(`created movie: ${movie.title}`)
    }
    console.log(`seeding completed!`)
};

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
    .finally((async () => {
    await prisma.$disconnect()
}))