import { Toaster } from 'react-hot-toast';
import Image from 'next/image'
import Banner from './components/Banner/index';
import Live from './components/Live/index';
// import Top from './components/Top/index';
// import Table from './components/Table/index';
import Features from './components/Features/index';
import Download from './components/Download/index';
import Faq from './components/Faq/index';
import Tabs from './components/Tabs/index';
// import Trade from './components/Trade/index';
// import Companies from './components/Companies/index';
// import getLeaderBoard from './api/leaderboard';

import BannerAnnouncement from './components/BannerAnnouncement';

const getLeaderBoard = async (banListName?: string) => {
	try {
		const url = banListName
			? `${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard?banListName=${encodeURIComponent(banListName)}`
			: `${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard`;

		const res = await fetch(url, {
			cache: 'no-store',
			next: { revalidate: 60 }
		});

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		const data = await res.json();
		return { data: data.leaderboard, lastUpdated: data.lastUpdated };
	} catch (error) {
		console.error(`Error fetching leaderboard for ${banListName || 'global'}:`, error);
		return { data: [], lastUpdated: null };
	}
}

// const getRooms = async () => {
// 	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms`,{ cache: 'no-store' });
// 	const data = await res.json();
// 	return data;
// }

const mergeRankings = (rankingsArray) => {

	const playerMap = new Map();

	// Merge rankings
	rankingsArray.forEach(ranking => {
		ranking.data.forEach(player => {
			const { username, points, wins, losses } = player;

			if (playerMap.has(username)) {
				const existingPlayer = playerMap.get(username);
				existingPlayer.points += points;
				existingPlayer.wins += wins;
				existingPlayer.losses += losses;
			} else {
				playerMap.set(username, {
					...player
				});
			}
		});
	});

	// Recalculate winrate
	const combinedPlayers = Array.from(playerMap.values()).map(player => {
		player.winRate = (player.wins / (player.wins + player.losses) * 100).toFixed(2);
		return player;
	});

	// Order by score
	combinedPlayers.sort((a, b) => b.score - a.score);

	// Recalculate position
	combinedPlayers.forEach((player, index) => {
		player.position = index + 1;
	});

	// get top 20 players
	const top20 = combinedPlayers.slice(0, 20);

	// Retrieve lastUpdated from the first ranking
	const lastUpdated = rankingsArray[0].lastUpdated;

	// Return the combined result in the requested format
	return {
		data: top20,
		lastUpdated: lastUpdated
	};
};



export default async function Home() {
	// const rooms = await getRooms();

	const [leaderboard, tcg202409, tcg202404, tcg202404ks, edison, goat, jtp] = await Promise.all([
		getLeaderBoard(),
		getLeaderBoard('2024.09 TCG'),
		getLeaderBoard('2024.04 TCG'),
		getLeaderBoard('2024.4 TCG KS'),
		getLeaderBoard('Edison(PreErrata)'),
		getLeaderBoard('2005.4 GOAT'),
		getLeaderBoard('JTP (Original)'),
		// getLeaderBoard('Evolution S6'),
		// getLeaderBoard('2024.01 TCG'),
		// getLeaderBoard('2024.1 TCG KS'),
	]);

	const rankings = [
		{
			name: 'General',
			title: 'Ranking (Top 20)',
			data: leaderboard,
			banListName: 'Global'
		},
		{
			name: '2024.09 TCG',
			title: '2024.09 TCG',
			data: tcg202409,
			banListName: '2024.09 TCG'
		},
		{
			name: '2024.04 TCG',
			title: '2024.04 TCG',
			data: mergeRankings([tcg202404, tcg202404ks]),
			banListName: ['2024.04 TCG', '2024.4 TCG KS']
		},
		{
			name: 'Edison',
			title: 'Edison',
			data: edison,
			banListName: 'Edison(PreErrata)'
		},
		{
			name: '2005.4 GOAT',
			title: '2005.4 GOAT',
			data: goat,
			banListName: '2005.4 GOAT'
		},
		{
			name: 'JTP (Original)',
			title: 'JTP (Original)',
			data: jtp,
			banListName: 'JTP (Original)'
		}
	];
	return (
		<main>
			<a href="https://www.buymeacoffee.com/randomtechguy" target="_blank" rel="noreferrer">
				{/* <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" 
					alt="Buy Me A Coffee" 
					style="height: 60px !important, width: 217px !important, position: fixed, bottom: 10, right: 10, zIndex: 99999">
				</img> */}
				<Image src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
					alt="Buy Me A Coffee"
					width={217}
					height={60}
					style={{ position: 'fixed', bottom: 10, right: 10, zIndex: 99999 }}
				/>
			</a>
			<BannerAnnouncement />
			<Banner />
			{/* <Companies /> */}
			<Live />
			{/* <Top leaderboard={leaderboard} /> */}
			<Tabs rankings={rankings} />
			{/* <Table ranking={leaderboard} title='Ranking (Top 20)'/>
			<Table ranking={thunderLeaderboard} title='Thunder Ranking' /> */}
			<Features />
			<Download />
			{/* <Trade /> */}
			<Faq />
			<Toaster position="bottom-center" reverseOrder={false} />
		</main>
	);
}