import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  // Endpoint to check the status of Redis and DB
  static getStatus(req, res) {
    const status = {
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    };
    res.status(200).json(status);
  }

  // Endpoint to get stats for users and files in the DB
  static async getStats(req, res) {
    const stats = {
      users: await dbClient.nbUsers(),
      files: await dbClient.nbFiles(),
    };
    res.status(200).json(stats);
  }
}

export default AppController;
