const Sequelize = require('sequelize');
const { MongoClient } = require('mongodb');
const { Pool } = require('pg');

// SQLite connection
const sqliteConnection = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

// MongoDB connection
const mongoConnectionPromise = MongoClient.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// PostgreSQL connection
const pgConnectionPool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

module.exports = {
  sqliteConnection,
  mongoConnectionPromise,
  pgConnectionPool,
};
