const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, TOKEN_GEN, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
