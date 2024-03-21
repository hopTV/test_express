const jwt = require("jsonwebtoken");

const generateAccessToken = (uid, role) =>
  jwt.sign({ _id: uid, role }, process.env.JWT_SECRECT, { expiresIn: "30m" });

const generateRefeshToken = (uid) =>
  jwt.sign({ _id: uid }, process.env.JWT_SECRECT, { expiresIn: "1d" });

module.exports = {
  generateAccessToken,
  generateRefeshToken,
};
