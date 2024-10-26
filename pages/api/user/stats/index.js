import { initializeDataSource } from '../../../../libs/database';

const handler = async (request, response) => {
	if(request.method === 'GET') {
		try {
			const dataSource = await initializeDataSource();
      const { userId } = request.query;

			const query = `
				WITH RankedPlayers AS (
						SELECT 
								id,
								user_id,
								points,
								wins,
								losses,
								ban_list_name,
								(wins::float / NULLIF(wins + losses, 0)) AS winRate,
								RANK() OVER (ORDER BY points DESC, (wins::float / NULLIF(wins + losses, 0)) DESC) AS rank
						FROM 
								player_stats
						WHERE 
								ban_list_name = 'Global'
						)
						SELECT *
						FROM RankedPlayers
						WHERE user_id = '${userId}';
			`

			const stats = await dataSource.query(query);

			if(!stats[0]) {
				return response.status(404).send("Stats not found");
			}

			response.status(200).json(stats[0])
		} catch (error) {
			console.error("Error during processing:", error);
      response.status(500).json({ error: 'Internal Server Error' });
		}
	} else {
    response.status(405).json({ error: 'Method not allowed' });
	}
}

export default handler;
