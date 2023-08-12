import { Toaster } from 'react-hot-toast';
import Banner from './components/Banner/index';
// import Companies from './components/Companies/index';
import Live from './components/Live/index';
import Top from './components/Top/index';
import Table from './components/Table/index';
import Features from './components/Features/index';
import Download from './components/Download/index';
// import Trade from './components/Trade/index';
import Faq from './components/Faq/index';
// import getLeaderBoard from './api/leaderboard';

const getLeaderBoard = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard`,{ cache: 'no-store' });
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
	return (
		<main>
			<Banner />
			{/* <Companies /> */}
			<Live rooms={rooms}/>
			<Top leaderboard={leaderboard}/>
			<Table ranking={leaderboard} />
			<Features />
			<Download />
			{/* <Trade /> */}
			<Faq />
			<Toaster position="bottom-center" reverseOrder={false}/>
		</main>
	);
}