import { Toaster } from 'react-hot-toast';
import Image from 'next/image'
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
			name: '2024.01 TCG',
			title: '2024.01 TCG',
			data: tcg,
			banlistname: '2024.01 TCG'
		}
	];
	return (
		<main>
			<a href="https://www.buymeacoffee.com/randomtechguy" target="_blank">
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