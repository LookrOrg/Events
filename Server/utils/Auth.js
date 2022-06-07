const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const auth = async (request, response, next) => {
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer ")
  ) {
    const token = request.headers.authorization.split("Bearer ")[1];
    try {
      const decodedToken = jsonwebtoken.verify(token, process.env.TOKEN_SECRET);

      const user = await prisma.users.findUnique({
        where: {
          handle: decodedToken,
        },
        include:{
          rfChatFirstUser: true,
          rfChatSecondtUser: true,
          rfEventsCreated: true,
          rfMessage: true,
          rfRequestJoin: true,
        }
      });
      if (user) {
        request.user = user;
        next();
      } else {
        response.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      response.status(500).json(error);
    }
  } else {
    response.status(401).json({ error: "No token found" });
  }
};

module.exports = auth;
