import createRedisClient from '../../../libs/redisUtils';
import {verifyJwt} from '../../../libs/jwtUtils';

const getPlayerScore = (games) => {
  let score = 0;
  games.forEach((game) => {
    if (game.result === 'winner') {
      score++;
    }
  });
  return score;
};

const handler = async (req, res) => {
  if (req.method === 'GET') {
    let decoded;
    // Verify jwt
    try {
      decoded = verifyJwt(req);
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

		let client;

    try {
      client = await createRedisClient();
      const { username } = decoded;
      const key = `user:${username}`;
      const usernameExists = await client.exists(key);

      if (!usernameExists) {
        res.status(409).json({ error: 'Username does not exist' });
        return;
      }

      let duels = await client.lRange(`user:${username}:duels`, 0, -1);

      if (duels.length > 0) {
        duels = duels.map((duel) => {
          duel = JSON.parse(duel);
          const players = duel.players.map((player) => {
            return {
              name: player.name,
              team: player.team,
              winner: player.winner,
              score: getPlayerScore(player.games),
            };
          });
          return {
            bestOf: duel.bestOf,
            date: duel.date,
            players: players,
            ranked: duel.ranked,
            turns: duel.turn,
          };
        });
      } else {
        duels = [];
      }
      res.status(200).json(duels);
    } catch (error) {
      console.error('Error during processing:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      if(client) await client.quit();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;