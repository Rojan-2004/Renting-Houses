# Database Drop Script

This script allows you to completely drop your database for development purposes.

## ⚠️ WARNING

**This script will permanently delete ALL data in your database!**
Make sure you have a backup before running this script.

## Usage

### Option 1: Drop All Tables (Recommended)
This will drop all tables but keep the database itself:

```bash
# Using npm script
npm run drop-db

# Or directly
node drop-database.js --confirm
```

### Option 2: Drop Entire Database (Extreme)
This will completely drop and recreate the database:

```bash
# Using npm script
npm run drop-db-full

# Or directly
node drop-database.js --confirm --full
```

## What Each Option Does

### Table Drop Mode (`npm run drop-db`)
- Drops all tables in the correct order (respecting foreign key constraints)
- Keeps the database structure intact
- Faster and safer for development
- Tables will be recreated when you restart your application

### Full Database Drop Mode (`npm run drop-db-full`)
- Completely drops the entire database
- Recreates an empty database with the same name
- More thorough but takes longer
- Use this if you have database-level issues

## Safety Features

- The script requires the `--confirm` flag to prevent accidental execution
- Shows clear warnings before execution
- Provides detailed feedback during the process
- Properly handles foreign key constraints
- Closes database connections cleanly

## After Running the Script

1. **For Table Drop**: Simply restart your application (`npm run dev`) and Sequelize will recreate the tables automatically.

2. **For Full Database Drop**: Restart your application and all tables will be recreated fresh.

## Troubleshooting

### Connection Issues
- Make sure your PostgreSQL server is running
- Verify your `.env` file has correct database credentials
- Ensure the database exists before running the script

### Permission Issues
- Make sure your database user has DROP privileges
- For full database drop, you need CREATEDB privileges

### Foreign Key Constraints
The script handles foreign key constraints by dropping tables in the correct order:
1. Like (references Comment and User)
2. Comment (references User)
3. Favorite (references User)
4. Booking (references User)
5. Property (references User)
6. User (base table)

## Example Output

```
🚨 WARNING: This will permanently delete all data in the database!
Database: Renting-Houses
Starting database drop process...

✅ Database connection established successfully.

📋 Dropping all tables...
✅ Dropped table: Likes
✅ Dropped table: Comments
✅ Dropped table: Favorites
✅ Dropped table: Bookings
✅ Dropped table: Properties
✅ Dropped table: Users

🎉 Database tables dropped successfully!
💡 You can now run your application to recreate the tables.

🔌 Database connection closed.
```

## Development Workflow

1. **Before major changes**: Create a backup of your data
2. **Reset database**: Run `npm run drop-db`
3. **Restart application**: Run `npm run dev`
4. **Fresh start**: Your application now has clean, empty tables

This is particularly useful when:
- Testing database migrations
- Cleaning up test data
- Starting fresh during development
- Resolving database schema conflicts