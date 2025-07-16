import { User } from '../../models/index.js';

/**
 *  fetch all users
 */
export const getAll = async (req, res) => {
    try {
        //fetching all the data from users table
        const users = await User.findAll();
        res.status(200).send({ data: users, message: "successfully fetched data" })
    } catch (e) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

/** 
 *  create new user
 */
export const create = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ message: 'Name, email, and password are required.', status: false });
        }
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.json({ message: 'Email already registered.' , status: false});
        }
        // Create new user
        const newUser = await User.create({ name, email, password });
        res.json({ message: 'User registered successfully', data: { id: newUser.id, name: newUser.name, email: newUser.email }, status: true });
    } catch (e) {
        res.json({ message: 'Failed to create user', status: false });
    }
};

/**
 *  update user
 */
export const update = async (req, res) => {
    try {
        // your update logic here
    } catch (e) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

/**
 *  delete user 
 */
export const delelteById = async (req, res) => {
    try {
        // your delete logic here
    } catch (e) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

/**
 *  fetch user by id
 */
export const getById = async (req, res) => {
    try {
        // your get by id logic here
    } catch (e) {
        res.status(500).json({ error: 'Failed to fetch user by id' });
    }
};

export const getUserCount = async (req, res) => {
  try {
    const count = await User.count();
    res.status(200).json({ count });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch user count' });
  }
};

export const banUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.update({ status: 'Banned' });
    res.status(200).json({ message: 'User banned successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to ban user' });
  }
};

export const unbanUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.update({ status: 'Active' });
    res.status(200).json({ message: 'User unbanned successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to unban user' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

export const userController = {
  getAll,
  create,
  update,
  delelteById,
  getById,
  getUserCount,
  banUser,
  unbanUser,
  deleteUser
};