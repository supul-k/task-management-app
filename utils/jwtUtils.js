const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const jwtUtils = {
  generateToken: (data) => {
    return jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });
  },
  verifyToken: (token) => {
    return jwt.verify(token, JWT_SECRET);
  },
};

module.exports = jwtUtils;
