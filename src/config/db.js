const { PrismaClient } = require("@prisma/client/extension");


const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"]
})

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Connected to the database");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }
}
const disconnectDB = async () => {
    try {
        await prisma.$disconnect();
        console.log("Disconnected from the database");
    } catch (error) {
        console.error("Failed to disconnect from the database:", error);
    }
}

export {prisma, connectDB, disconnectDB}