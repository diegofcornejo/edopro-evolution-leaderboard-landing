// redisUtils.js
import { createClient } from 'redis';

function createRedisClient() {
  return new Promise((resolve, reject) => {
    const client = createClient({ url: process.env.REDIS_URL });

    client.on('error', (err) => {
      console.error('Redis Client Error', err);
      client.quit(); // Cerrar el cliente en caso de error
      reject(err); // Rechazar la promesa en caso de error
    });

    client.on('ready', () => {
      console.log('Redis client connected');
      resolve(client); // Resolver la promesa con la instancia del cliente en caso de éxito
    });
  });
}

export default createRedisClient;