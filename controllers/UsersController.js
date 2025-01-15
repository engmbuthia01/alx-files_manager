const redisClient = require('../utils/redis');
const DBClient = require('../utils/db');

class UsersController {
  static async postNew(req, res) {
    // Existing code for creating a user
  }

  static async getMe(req, res) {
    const token = req.headers['x-token'];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const tokenKey = `auth_${token}`;
    const userId = await redisClient.get(tokenKey);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const usersCollection = await DBClient.getCollection('users');
    const user = await usersCollection.findOne({ _id: DBClient.ObjectID(userId) });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    return res.status(200).json({ id: user._id, email: user.email });
  }
}

module.exports = UsersController;
