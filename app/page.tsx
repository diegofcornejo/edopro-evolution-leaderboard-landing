import { Toaster } from 'react-hot-toast';
import Banner from './components/Banner/index';
import Live from './components/Live/index';
import Top from './components/Top/index';
// import Table from './components/Table/index';
import Features from './components/Features/index';
import Download from './components/Download/index';
import Faq from './components/Faq/index';
import Tabs from './components/Tabs/index';
// import Trade from './components/Trade/index';
// import Companies from './components/Companies/index';
// import getLeaderBoard from './api/leaderboard';

const getLeaderBoard = async (banlistname?: string) => {
	if (!banlistname) {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard`, { cache: 'no-store' });
		const data = await res.json();
		return { data: data.leaderboard, lastUpdated: data.lastUpdated };
	}

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard?banlistname=${banlistname}`, { cache: 'no-store' });
	const data = await res.json();
	return { data: data.leaderboard, lastUpdated: data.lastUpdated };
}

// const getRooms = async () => {
// 	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms`,{ cache: 'no-store' });
// 	const data = await res.json();
// 	return data;
// }

export default async function Home() {
	// const rooms = await getRooms();
	const leaderboard = await getLeaderBoard();
	const evolution = await getLeaderBoard('Evolution S6');
	const edison = await getLeaderBoard('Edison(PreErrata)');
	const tcg = await getLeaderBoard('2024.01 TCG');
	const mockLeaderBoard = {
		"data": [],
		"lastUpdated": new Date().toISOString()
	}
	const rankings = [
		{
			name: 'General',
			title: 'Ranking (Top 20)',
			data: leaderboard,
			banlistname: 'Global'
		},
		{
			name: 'Evolution S6',
			title: 'Evolution S6',
			data: evolution,
			banlistname: 'Evolution S6'
		},
		{
			name: 'Edison',
			title: 'Edison',
			data: edison,
			banlistname: 'Edison(PreErrata)'
		},
		{
			name: '2024.01 TCGG',
			title: '2024.01 TCGG',
			data: tcg,
			banlistname: '2024.01 TCGG'
		}
	];
	return (
		<main>
			<Banner />
			{/* <Companies /> */}
			<Live />
			<Top leaderboard={leaderboard} />
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