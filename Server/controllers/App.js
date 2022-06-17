require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { validate } = require("email-validator");
const jsonwebtoken = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const login = async (request, response) => {
  const { email, password } = request.body;
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
        const jwt = jsonwebtoken.sign(user.handle, TOKEN_SECRET);
        response.status(200).json(jwt);
      } else {
        response.status(400).json({ error: "wrong password" });
      }
    } else {
      response.status(404).json({ error: "user not found" });
    }
  } catch (error) {
    console.error(error);
  }
};

const signup = async (request, response) => {
  const user = request.body;
  try {
    //controllo la password
    if (validate(user.email)) {
      //prendo un utente che ha la stessa mail
      const checkUser = await prisma.users.findFirst({
        where: {
          email: user.email,
          handle: user.handle
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
            //creo l'utente nel db
            try {
              const { confirmPassword, ...User } = user;
              const newUser = await prisma.users.create({
                data: User,
              });
              if (newUser) {
                const jwt = jsonwebtoken.sign(newUser.handle, TOKEN_SECRET);
                response.status(200).json(jwt);
              } else {
                response
                  .status(500)
                  .json({ error: "user not created, error in the server" });
              }
            } catch (error) {
              console.error(error);
              response.status(500).json({ error: "Internal server error" });
            }
          } else {
            response.status(400).json({
              error: "the password doesn't match the required parameter",
            });
          }
        } else {
          response.status(400).json({ error: "password are different" });
        }
      } else {
        response.status(400).json({ error: "user already exist" });
      }
    } else {
      response.status(400).json({ error: "email is invalid" });
    }
  } catch (error) {
    response.status(500).json(error);
  }
};

const checkEmail = async (request, response) => {
  const { email } = request.query;
  if(!email) {
    response.status(400).json({error: "email query not found"})
  }else{
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
        response.status(404).json({ result: "No email found" });
      } else {
        response.status(200).json({ error: "email already taken" });
      }
    } catch (error) {
    response.status(500).json(error);
    }
  }
 
};

const checkHandle = async (request, response) => {
  const { handle } = request.query;
  if(!handle){
    response.status(400).json({error: "handle query not found!"})
  }else{
    try {
      const user = await prisma.users.findFirst({
        where: {
          handle: handle
        },
        select:{
          handle: true
        }
      });
      if(!user){
        response.status(200).json({value: "No user found"})
      }else{
        response.status(200).json(user)
      }
    } catch (error) {
      console.error(error);
      response.status(500).json(error)
    }
  }
}

module.exports = {
  login,
  signup,
  checkEmail,
  checkHandle
};
