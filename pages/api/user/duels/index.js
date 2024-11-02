import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { initializeDataSource } from '../../../../libs/database';



const handler = async (request, response) => {
  if (request.method === 'GET') {
    try {
			const session = await getServerSession(request, response, authOptions)

			if(!session) {
				response.status(401).json({ error: 'Unauthorized' });
			}

      const { banListName, userId } = request.query;

      if (!userId) {
        return response.status(400).json({ error: 'userId is required.' });
      }

      const dataSource = await initializeDataSource();
			const query = banListName === 'Global' ? `
				SELECT date, winner, best_of, ban_list_name, player_names, opponent_names, player_score, opponent_score, points 
				FROM matches 
				WHERE user_id = '${userId}'
				ORDER BY date DESC
			` : 
			`
				SELECT date, winner, best_of, ban_list_name, player_names, opponent_names, player_score, opponent_score, points 
				FROM matches 
				WHERE ban_list_name = '${banListName}' AND user_id = '${userId}'
				ORDER BY date DESC
			`
			const matches = await dataSource.query(query)

      return response.status(200).json(matches.map(match => ({
				bestOf: match.best_of,
				banListName: match.ban_list_name,
				playerNames: match.player_names.split(','),
				opponentNames: match.opponent_names.split(','),
				playerScore: match.player_score,
				opponentScore: match.opponent_score,
				points: match.points,
				winner: match.winner,
				date: match.date,
				type: (match.player_names.split(',').length >= 2 || match.opponent_names.split(',').length >= 2) ? 'Tag' : 'PvP',

			})));
    } catch (error) {
			console.error("Error during processing:", error);
      response.status(500).json({ error: 'Internal Server Error' });
		}
  } else {
    response.status(405).json({ error: 'Method not allowed' });
	}
};

export default handler;
