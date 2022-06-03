const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const login = async (req, res) => {};

const signup = async (req, res) => {};

const checkHandle = async (req, res) => {};

module.exports = {
  login,
  signup,
  checkHandle,
};
