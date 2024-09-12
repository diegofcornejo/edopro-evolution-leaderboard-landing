/* eslint-disable unicorn/no-null */
import { DataSource } from 'typeorm';
import databaseConfig from '../../../ormconfig.json';

let AppDataSource;

const initializeDataSource = async () => {
  if (!AppDataSource || !AppDataSource.isInitialized) {
    AppDataSource = new DataSource(databaseConfig);
    await AppDataSource.initialize();
  }
  return AppDataSource;
};

const handler = async (request, response) => {
  if (request.method === 'GET') {
    try {
      const { banListName = 'global', limit = 20 } = request.query;
      const dataSource = await initializeDataSource();
      
      const query = `
				SELECT user_id, username, avatar, points, wins, losses
				FROM player_stats
				INNER JOIN users ON player_stats.user_id = users.id
				WHERE player_stats.ban_list_name = '${banListName}' 
				ORDER BY points DESC
				LIMIT ${limit}
			`;
      const topPlayers = await dataSource.query(query);
			const leaderboard = topPlayers.map((player, index) => ({
				userId: player.user_id,
				points: player.points,
				wins: player.wins,
				losses: player.losses,
				username: player.username,
				avatar: player.avatar ? JSON.parse(player.avatar) : null,
				winRate: (player.wins / (player.wins + player.losses) * 100).toFixed(2),
				position: index + 1,
			}))
      response.status(200).json({
				leaderboard,
				lastUpdated: new Date().toISOString(),
			});
    } catch (error) {
      console.error("Error during processing:", error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    response.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;