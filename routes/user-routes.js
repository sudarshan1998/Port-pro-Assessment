const express = require('express');
const DatabaseProvider = require('../database-provider');

const router = express.Router();

// Route for SQLite
router.get('/v1/users', async (req, res) => {
  try {
    const databaseProvider = new DatabaseProvider('sqlite');
    const users = await databaseProvider.getUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for MongoDB
router.get('/v2/users', async (req, res) => {
  try {
    const databaseProvider = new DatabaseProvider('mongodb');
    const users = await databaseProvider.getUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for PostgreSQL
router.get('/v3/users', async (req, res) => {
  try {
    const databaseProvider = new DatabaseProvider('postgresql');
    const users = await databaseProvider.getUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
