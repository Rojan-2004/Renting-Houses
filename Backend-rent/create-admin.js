import { User } from './src/models/index.js';
import { sequelize } from './src/database/index.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

async function createAdmin() {

  const hashPassword = await bcrypt.hash('admin123', 10);
  console.log(hashPassword);
  await sequelize.sync(); // Ensure tables exist
  const name = 'Admin';
  const email = 'admin@example.com';
  const password = hashPassword; // Change this after first login!
  const role = 'admin';
  const status = 'Active';

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    console.log('Admin user already exists:', existing.email);
    process.exit(0);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await User.create({ name, email, password, role, status });
  console.log('Admin user created:', admin.email);
  process.exit(0);
}

createAdmin().catch(err => {
  console.error('Failed to create admin:', err);
  process.exit(1);
}); 