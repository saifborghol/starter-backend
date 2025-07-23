const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const comparePassword = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);

const generateToken = (userId) =>
  jwt.sign(
    { id: userId },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
    },
    { algorithm: process.env.ACCESS_TOKEN_SIGN_ALGO }
  );

const generateRefreshToken = (userId) =>
  jwt.sign(
    { id: userId },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
    },
    { algorithm: process.env.ACCESS_TOKEN_SIGN_ALGO }
  );

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  generateRefreshToken,
};
