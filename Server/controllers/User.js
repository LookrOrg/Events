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

const addRating = async (request, response) => {
  const { handle } = request.user;
  let { rating } = request.user;
  if (rating >= 10)
    response.status(200).json({ error: "user has already max rating" });
  else {
    try {
      const updatedUser = await prisma.users.update({
        where: {
          handle: handle,
        },
        data: {
          rating: ++rating,
        },
      });
      response.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: error });
    }
  }
};

const removeRating = async (request, response) => {
    const { handle } = request.user;
  let { rating } = request.user;
  if (rating <= 0)
    response.status(200).json({ error: "user has already the minimum rating" });
  else {
    try {
      const updatedUser = await prisma.users.update({
        where: {
          handle: handle,
        },
        data: {
          rating: --rating,
        },
      });
      response.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: error });
    }
  }
}
module.exports = {
  getUserAuth,
  getUserByHandle,
  addRating,
  removeRating
};
