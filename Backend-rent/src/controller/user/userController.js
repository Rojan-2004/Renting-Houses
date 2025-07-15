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

export const userController = {
  getAll,
  create,
  update,
  delelteById,
  getById
};