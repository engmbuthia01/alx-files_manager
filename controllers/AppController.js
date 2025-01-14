const RedisClient = require('../utils/redis');
const DBClient = require('../utils/db');

class AppController {
  static getStatus(req, res) {
    res.status(200).json({
      redis: RedisClient.isAlive(),
      db: DBClient.isAlive(),
    });
  }

  static async getStats(req, res) {
    const users = await DBClient.nbUsers();
    const files = await DBClient.nbFiles();
    res.status(200).json({ users, files });
  }
}

module.exports = AppController;
