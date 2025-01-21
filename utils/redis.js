import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    // Display any error from the Redis client in the console
    this.client.on('error', (err) => console.error(`Redis Client Error: ${err}`));
  }

  // Check if the Redis connection is alive
  isAlive() {
    return this.client.connected;
  }

  // Get a value by key from Redis
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) return reject(err);
        resolve(value);
      });
    });
  }

  // Set a value in Redis with a key and expiration time (in seconds)
  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (err) => {
        if (err) return reject(err);
        resolve(true);
      });
    });
  }

  // Delete a value by key from Redis
  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err) => {
        if (err) return reject(err);
        resolve(true);
      });
    });
  }
}

// Export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
