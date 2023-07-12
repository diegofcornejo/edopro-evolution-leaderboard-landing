import { createClient } from 'redis';
const client = createClient({ url: process.env.REDIS_URL });
client.on('error', err => console.log('Redis Client Error', err));

// const { createHash } = require('crypto');

// // Generate a MD5 hash
// const generateMD5Hash = (value) => {
//   return createHash('md5').update(value).digest('hex');
// };

// // Generate a SHA1 hash and then a MD5 hash
// const generateSHA1MD5Hash = (password) => {
//   const sha1Password = createHash('sha1').update(password).digest('hex');
//   const md5Password = generateMD5Hash(sha1Password);
//   return md5Password;
// };


const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      await client.connect();
      let leaderboard = await client.ZRANGEBYSCORE_WITHSCORES('leaderboard', '-inf', '+inf');
      leaderboard = leaderboard.sort((a, b) => b.score - a.score);
      await client.quit();
      res.status(200).json(leaderboard);
    } catch (error) {
      console.log('ERROR', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
