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
      select: {
        handle: true,
        email: true,
        password: true,
      },
      where: {
        email: email,
      },
    });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const jwt = jsonwebtoken.sign(user.handle, process.env.TOKEN_SECRET);
        res.status(200).json(jwt);
      } else {
        res.status(500).json({ error: "wrong password" });
      }
    } else {
      res.status(404).json({ error: "user not found" });
    }
  } catch (error) {
    console.error(error);
  }
};

const signup = async (req, res) => {
  const user = req.body;
  try {
    //controllo la password
    if (validate(user.email)) {
      //prendo un utente che ha la stessa mail
      const checkUser = await prisma.users.findFirst({
        where: {
          email: user.email,
        },
      });
      //se non esiste continuo
      if (!checkUser) {
        //controllo che le password siano uguali
        if (user.password == user.confirmPassword) {
          const regex = new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          );
          //controllo la validità della password (otto caratteri, 1 upper case, 1 lower case, 1 special character
          if (regex.exec(user.password)) {
            //cripto la password
            const hash = bcrypt.hashSync(user.password, 10);
            user.password = hash;
            const { confirmPassword, ...User } = user;
            //creo l'utente nel db
            try {
              const newUser = await prisma.users.create({
                data: User,
              });
              if (newUser) {
                const jwt = jsonwebtoken.sign(
                  newUser.handle,
                  process.env.TOKEN_SECRET
                );
                res.status(200).json(jwt);
              } else {
                res
                  .status(500)
                  .json({ error: "user not created, error in the server" });
              }
            } catch (error) {
              console.error(error);
              res.status(500).json({ error: "Internal server error" });
            }
          } else {
            res.status(400).json({
              error: "the password doesn't match the required parameter",
            });
          }
        } else {
          res.status(400).json({ error: "password are different" });
        }
      } else {
        res.status(400).json({ error: "user already exist" });
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
