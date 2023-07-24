// redisUtils.js
import { createClient } from 'redis';

async function createRedisClient() {
  const client = createClient({ url: process.env.REDIS_URL });

  return new Promise((resolve, reject) => {
    client.on('error', (err) => {
      console.error('Redis Client Error', err);
      reject(err);
    });

    client.on('ready', () => {
      console.log('Redis client connected');
      resolve(client);
    });

		client.on('end', () => {
			console.log('Redis client disconnected');
		});

    client.connect();
  });
}

export default createRedisClient;