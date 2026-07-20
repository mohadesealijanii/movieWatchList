import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";

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
  });

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
    .json({ status: "success", message: "you successfully logged in!" });
};

export { register, login };
