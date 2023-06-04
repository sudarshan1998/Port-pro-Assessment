const { sqliteConnection, mongoConnectionPromise, pgConnectionPool } = require('./db-config/db');
const User = require('./models/User');

class DatabaseProvider {
  constructor(databaseType) {
    switch (databaseType) {
      case 'sqlite':
        this.connection = sqliteConnection;
        break;
      case 'mongodb':
        this.connectionPromise = mongoConnectionPromise;
        break;
      case 'postgresql':
        this.connectionPool = pgConnectionPool;
        break;
      default:
        throw new Error(`Invalid database type: ${databaseType}`);
    }
  }

  async getUsers() {
    switch (this.databaseType) {
      case 'sqlite':
        return User(this.connection).findAll();
      case 'mongodb':
        const connection = await this.connectionPromise;
        const db = connection.db('your_database');
        return db.collection('users').find().toArray();
      case 'postgresql':
        const client = await this.connectionPool.connect();
        const result = await client.query('SELECT * FROM users');
        client.release();
        return result.rows;
      default:
        throw new Error('Invalid database type');
    }
  }
}

module.exports = DatabaseProvider;
