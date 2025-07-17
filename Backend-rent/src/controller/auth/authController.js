import { User } from "../../models/index.js";
import { generateToken } from "../../security/jwt-util.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.json({ message: "Name, email, and password are required.", success: false });
    }
    // Check for duplicate email
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.json({ message: "Email already registered.", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, hashedPassword, status: 'Active', role: role || 'user' });
    const token = generateToken({ id: user.id, role: user.role });
    return res.json({
      user,
      token,
      message: "Registration successful",
      success: true,
    });
  } catch (e) {
    res.json({ message: "Failed to register", error: e.message, success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "Email and password are required.", success: false });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.json({ message: "User not found.", success: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      return res.json({ message: "Incorrect password.", success: false });
    }
    const token = generateToken({ id: user.id, role: user.role });
    return res.json({
      user,
      token,
      message: "Login successful",
      success: true,
    });
  } catch (e) {
    res.json({ message: "Failed to login", error: e.message, success: false });
  }
};

export const authController = {
  register,
  login,
};
