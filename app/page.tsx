import { Toaster } from 'react-hot-toast';
import Banner from './components/Banner/index';
import Live from './components/Live/index';
import Top from './components/Top/index';
import Table from './components/Table/index';
import Features from './components/Features/index';
import Download from './components/Download/index';
import Faq from './components/Faq/index';
import Tabs from './components/Tabs/index';
// import Trade from './components/Trade/index';
// import Companies from './components/Companies/index';
// import getLeaderBoard from './api/leaderboard';

const getLeaderBoard = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard`,{ cache: 'no-store' });
	const data = await res.json();
	return data;
}

const getThunderLeaderBoard = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard/thunder`,{ cache: 'no-store' });
	const data = await res.json();
	return data;
}

const getRooms = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms`,{ cache: 'no-store' });
	const data = await res.json();
	return data;
}

export default async function Home() {
	const rooms = await getRooms();
	const leaderboard = await getLeaderBoard();
	const thunderLeaderboard = await getThunderLeaderBoard();
	const mockLeaderBoard = {
		"data": [],
		"lastUpdated": new Date().toISOString()
	}
	const rankings = [
		{
			name: 'General',
			title: 'Ranking (Top 20)',
			data: leaderboard,
		},
		{
			name: 'Thunder',
			title: 'Thunder Ranking',
			data: thunderLeaderboard,
		},
		,
		{
			name: 'Edison',
			title: 'Edison (Soon)',
			data: mockLeaderBoard,
		},
		{
			name: 'JTP',
			title: 'JTP (Soon)',
			data: mockLeaderBoard,
		},
		,
		{
			name: 'GX',
			title: 'GX (Soon)',
			data: mockLeaderBoard,
		}
	];
	return (
		<main>
			<Banner />
			{/* <Companies /> */}
			<Live rooms={rooms}/>
			<Top leaderboard={leaderboard}/>
			<Tabs rankings={rankings}/>
			{/* <Table ranking={leaderboard} title='Ranking (Top 20)'/>
			<Table ranking={thunderLeaderboard} title='Thunder Ranking' /> */}
			<Features />
			<Download />
			{/* <Trade /> */}
			<Faq />
			<Toaster position="bottom-center" reverseOrder={false}/>
		</main>
	);
}