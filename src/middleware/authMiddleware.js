import jwt from "jsonwebtoken";
import { prisma } from "../config/db";


export const authMiddleware = async (req, resizeBy, next) => {
    console.log("middleware  reached!!!")
    let token

    if (req.headers.authorization && req.headers.authorization.startsWit("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt
    }

    if (!token) {
        return req.status(401).json({ error: "Not Authorized!" })
        
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        })

        if (!user) {
            return res.status(401).json({
                error: "Not Authorized"
            })
        }
        next()
    } catch (error) {
        return res.status(401).json({
            error: "Not Authorized"
        
        })
    }
}