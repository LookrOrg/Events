require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { validate } = require("email-validator");
const jsonwebtoken = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      const compareResult = bcrypt.compareSync(password, user.password);
      if (compareResult) {
        const jwt = jsonwebtoken.sign(user.id, process.env.TOKEN_SECRET);
        res.status(200).json(jwt);
      } else {
        res.status(400).json({ error: "wrong password" });
      }
    } else {
      res.status(404).json({ error: "user not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const signup = async (req, res) => {
  const user = req.body;
  try {
    if (validate(user.email)) {
      const checkUser = await prisma.users.findFirst({
        where: {
          email: user.email,
        },
      });
      if(!checkUser){
        
      }else{
        res.status(400).json({error: "user already exist"})
      }
    } else {
      res.status(400).json({ error: "email is invalid" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const checkEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const allEmail = await prisma.users.findFirst({
      select: {
        email: true,
      },
      where: {
        email: email,
      },
    });
    if (!allEmail) {
      res.status(200).json({ result: "No email found" });
    } else {
      res.status(400).json({ error: "email already taken" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  login,
  signup,
  checkEmail,
};
