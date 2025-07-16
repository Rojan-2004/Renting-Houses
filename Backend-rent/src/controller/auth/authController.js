import { User } from "../../models/index.js";
import { generateToken } from "../../security/jwt-util.js";

const login = async (req, res) => {
  try {
    // Hardcoded admin login
    if (req.body.email === "admin@gmail.com" && req.body.password === "admin123") {
      const adminUser = {
        id: 0,
        name: "Admin",
        email: "admin@gmail.com",
        role: "admin"
      };
      const token = generateToken({ user: adminUser });
      return res.status(200).send({
        data: { access_token: token, user: adminUser },
        message: "successfully logged in as admin",
      });
    }
    //fetching all the data from users table
    if (req.body.email == null) {
      return res.status(500).send({ message: "email is required" });
    }
    if (req.body.password == null) {
      return res.status(500).send({ message: "email is required" });
    }
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(500).send({ message: "user not found" });
    }
    if (user.password == req.body.password) {
      const token = generateToken({ user: user.toJSON() });
      return res.status(200).send({
        data: { access_token: token, user: user.toJSON() },
        message: "successfully logged in",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to login" });
  }
};

/**
 *  init
 */

const init = async (req, res) => {
  try {
    const user = req.user.user;
    delete user.password;
    res
      .status(201)
      .send({ data: user, message: "successfully fetched current  user" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const authController = {
  login,
  init,
};
