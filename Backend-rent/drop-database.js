import { sequelize } from './src/database/index.js';
import { User, Comment, Favorite, Like, Booking, Property } from './src/models/index.js';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Script to drop the entire database
 * WARNING: This will permanently delete all data!
 */

const dropDatabase = async () => {
  try {
    console.log('🚨 WARNING: This will permanently delete all data in the database!');
    console.log(`Database: ${process.env.DB_NAME}`);
    console.log('Starting database drop process...\n');

    // Test connection first
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Option 1: Drop all tables (recommended for development)
    console.log('\n📋 Dropping all tables...');
    
    // Drop tables in correct order (considering foreign key constraints)
    const models = [Like, Comment, Favorite, Booking, Property, User];
    
    for (const model of models) {
      try {
        await model.drop({ cascade: true });
        console.log(`✅ Dropped table: ${model.tableName}`);
      } catch (error) {
        console.log(`⚠️  Table ${model.tableName} might not exist: ${error.message}`);
      }
    }

    // Alternative: Drop all tables using Sequelize sync with force
    // await sequelize.sync({ force: true });
    // console.log('✅ All tables dropped and recreated (empty)');

    console.log('\n🎉 Database tables dropped successfully!');
    console.log('💡 You can now run your application to recreate the tables.');

  } catch (error) {
    console.error('❌ Error dropping database:', error.message);
    console.error('Full error:', error);
  } finally {
    // Close the connection
    await sequelize.close();
    console.log('\n🔌 Database connection closed.');
    process.exit(0);
  }
};

// Option 2: Drop entire database (more destructive)
const dropEntireDatabase = async () => {
  try {
    console.log('🚨 EXTREME WARNING: This will drop the entire database!');
    console.log(`Database: ${process.env.DB_NAME}`);
    
    // Connect to postgres database to drop the target database
    const { Sequelize } = await import('sequelize');
    const adminSequelize = new Sequelize(
      'postgres', // Connect to default postgres database
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false
      }
    );

    await adminSequelize.authenticate();
    console.log('✅ Connected to PostgreSQL server.');

    // Terminate all connections to the target database
    await adminSequelize.query(`
      SELECT pg_terminate_backend(pid)
      FROM pg_stat_activity
      WHERE datname = '${process.env.DB_NAME}' AND pid <> pg_backend_pid();
    `);

    // Drop the database
    await adminSequelize.query(`DROP DATABASE IF EXISTS "${process.env.DB_NAME}";`);
    console.log(`✅ Database "${process.env.DB_NAME}" dropped successfully!`);

    // Recreate the database
    await adminSequelize.query(`CREATE DATABASE "${process.env.DB_NAME}";`);
    console.log(`✅ Database "${process.env.DB_NAME}" recreated successfully!`);

    await adminSequelize.close();
    console.log('\n🎉 Database completely reset!');

  } catch (error) {
    console.error('❌ Error dropping entire database:', error.message);
    console.error('Full error:', error);
  }
};

// Main execution
const main = async () => {
  const args = process.argv.slice(2);
  
  if (args.includes('--confirm')) {
    if (args.includes('--full')) {
      console.log('🔥 FULL DATABASE DROP MODE');
      await dropEntireDatabase();
    } else {
      console.log('🗑️  TABLE DROP MODE');
      await dropDatabase();
    }
  } else {
    console.log('🚨 DATABASE DROP SCRIPT');
    console.log('==========================================');
    console.log('This script will permanently delete all data!');
    console.log('');
    console.log('Usage:');
    console.log('  npm run drop-db          - Drop all tables (recommended)');
    console.log('  npm run drop-db-full     - Drop entire database (extreme)');
    console.log('');
    console.log('Or run directly:');
    console.log('  node drop-database.js --confirm           - Drop all tables');
    console.log('  node drop-database.js --confirm --full    - Drop entire database');
    console.log('');
    console.log('⚠️  Make sure you have a backup before running this!');
    process.exit(1);
  }
};

main();