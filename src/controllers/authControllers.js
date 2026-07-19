import { prisma } from "../config/db.js"
import {bcrypt} from "bcrypt"

const register = async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await prisma.user.findFirst({
        where: { email: email }
    })

    if (userExists) {
        return res
            .status(400)
            .json({ error: "User Exists!" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name,
                email
            }
        }
    })

}




export { register }