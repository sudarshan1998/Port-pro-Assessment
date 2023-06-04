const { sqliteConnection, mongoConnectionPromise, pgConnectionPool } = require('./db-config/db');
const User = require('./models/User');

// Seed data for SQLite
async function seedSQLite() {
  try {
    await User(sqliteConnection).sync({ force: true });
    await User(sqliteConnection).bulkCreate([
      { name: 'User 1', profilePic: 'pic1.jpg' },
      { name: 'User 2', profilePic: 'pic2.jpg' },
      { name: 'User 3', profilePic: 'pic3.jpg' },
    ]);
    console.log('SQLite data seeded successfully');
  } catch (error) {
    console.error('Error seeding SQLite:', error);
  }
}

// Seed data for MongoDB
async function seedMongoDB() {
  try {
    const mongoConnection = await mongoConnectionPromise;
    const db = mongoConnection.db('users');
    await db.collection('users').deleteMany({});
    await db.collection('users').insertMany([
      { name: 'User 1', profilePic: 'pic1.jpg' },
      { name: 'User 2', profilePic: 'pic2.jpg' },
      { name: 'User 3', profilePic: 'pic3.jpg' },
    ]);
    console.log('MongoDB data seeded successfully');
  } catch (error) {
    console.error('Error seeding MongoDB:', error);
  }
}

// Seed data for PostgreSQL
async function seedPostgreSQL() {
  try {
    const client = await pgConnectionPool.connect();
    await client.query('DELETE FROM users');
    await client.query(
      `INSERT INTO users (name, profilePic) VALUES
      ('User 1', 'pic1.jpg'),
      ('User 2', 'pic2.jpg'),
      ('User 3', 'pic3.jpg')`
    );
    client.release();
    console.log('PostgreSQL data seeded successfully');
  } catch (error) {
    console.error('Error seeding PostgreSQL:', error);
  }
}

// Seed data for all databases
async function seedData() {
  await seedSQLite();
  await seedMongoDB();
  await seedPostgreSQL();
}

seedData();
