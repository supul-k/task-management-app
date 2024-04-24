const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwtUtils");

class UserController {
  async createUser(req, res) {
    const { name, email, password } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, 10);

    try {
      const user = await User.create({ name, email, encryptedPassword });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = jwtUtils.generateToken(user);
          res.status(200).json({ user, token });
        } else {
          res.status(401).json({ error: "Invalid credentials" });
        }
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
