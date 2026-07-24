import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await prisma.user.findFirst({
    where: { email: email },
  });

  if (userExists) {
    return res.status(400).json({ status: "failed", message: "User Exists!" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        name,
        email,
      },
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({
    where: { email },
  })
  const token = generateToken(user.id, res)

  if (!user) {
    return res
      .status(401)
      .json({ status: "failed", message: "User Not Found!" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ status: "failed", message: "Incorrect username or password!" });
  }

  return res
    .status(201)
    .json({
      status: "success", message: "you successfully logged in!", data: {
        user: {
        id: user.id,
        email
      },
      token
      },
    });
};

const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).json({
    status: "success",
    message: "Loggesd out succesfully"
  })
}

export { register, login, logout };
