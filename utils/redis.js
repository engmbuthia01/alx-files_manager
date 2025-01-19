const { createClient } = require('redis');

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.error(`Redis Error: ${err}`));
    this.client.connect();
  }

  async set(key, value, duration) {
    await this.client.set(key, value, { EX: duration });
  }

  async get(key) {
    return this.client.get(key);
  }

  async del(key) {
    await this.client.del(key);
  }
}

module.exports = new RedisClient();
