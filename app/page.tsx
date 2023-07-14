
import Banner from './components/Banner/index';
// import Companies from './components/Companies/index';
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

export default async function Home() {
	const leaderboard = await getLeaderBoard();
	console.log(leaderboard);
	return (
		<main>
			<Banner />
			{/* <Companies /> */}
			<Top leaderboard={leaderboard}/>
			<Table leaderboard={leaderboard} />
			<Features />
			<Download />
			{/* <Trade /> */}
			<Faq />
		</main>
	);
}