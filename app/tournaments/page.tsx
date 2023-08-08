import { Toaster } from 'react-hot-toast';
// import Banner from '../components/Banner/index';
import Companies from '../components/Companies/index';
// import Top from '../components/Top/index';
import Tournaments from '../components/Tournaments/index';
// import Features from '../components/Features/index';
// import Download from '../components/Download/index';
// import Trade from './components/Trade/index';
// import Faq from '../components/Faq/index';
// import getLeaderBoard from './api/leaderboard';

const getTournaments = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tournaments`,{ cache: 'no-store' });
	const data = await res.json();
	return data;
}

export default async function Home() {
	const tournaments = await getTournaments();
	console.log(tournaments);
	return (
		<main>
			{/* <Banner /> */}
			<Companies />
			{/* <Top leaderboard={leaderboard}/> */}
			<Tournaments tournaments={tournaments} />
			{/* <Features /> */}
			{/* <Download /> */}
			{/* <Faq /> */}
			<Toaster position="bottom-center" reverseOrder={false}/>
		</main>
	);
}