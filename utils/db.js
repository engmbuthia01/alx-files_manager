import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.databaseName = database;

    // Connect to the database
    this.client.connect()
      .then(() => {
        this.db = this.client.db(this.databaseName);
        console.log('MongoDB connected successfully');
      })
      .catch((err) => {
        console.error(`MongoDB connection error: ${err}`);
      });
  }

  // Check if MongoDB connection is alive
  isAlive() {
    return this.client && this.client.isConnected();
  }

  // Get the number of documents in the "users" collection
  async nbUsers() {
    if (!this.isAlive()) {
      return 0;
    }
    const usersCollection = this.db.collection('users');
    return usersCollection.countDocuments();
  }

  // Get the number of documents in the "files" collection
  async nbFiles() {
    if (!this.isAlive()) {
      return 0;
    }
    const filesCollection = this.db.collection('files');
    return filesCollection.countDocuments();
  }
}

// Export an instance of DBClient
const dbClient = new DBClient();
export default dbClient;
