const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserAuth = async (request, response) => {
  const user = request.user;
  if (!user)
    response.status(404).json({ error: "User not found (idk how u get here)" });
  else response.status(200).json(user);
};

const getUserByHandle = async (request, response) => {
  const { handle } = request.params;
  if (!handle) response.status(404).json({ error: "missing handle param" });
  else {
    try {
      const userFounded = await prisma.users.findUnique({
        where: {
          handle: handle,
        },
        select: {
          handle: true,
          name: true,
          surname: true,
          email: true,
          phone: true,
          rating: true,
          image: true,
          creationDate: true,
          rfEventsCreated: true,
        },
      });
      if (userFounded) response.status(200).json(userFounded);
      else response.status(404).json({ error: "no user founded" });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: error });
    }
  }
};
module.exports = {
  getUserAuth,
  getUserByHandle,
};
