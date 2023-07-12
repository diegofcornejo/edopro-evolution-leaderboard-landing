import { createClient } from 'redis';
const client = createClient({ url: process.env.REDIS_URL });
client.on('error', (err) => console.log('Redis Client Error', err));

import Banner from './components/Banner/index';
import Companies from './components/Companies/index';
import Work from './components/Work/index';
import Table from './components/Table/index';
import Features from './components/Features/index';
import Simple from './components/Simple/index';
import Trade from './components/Trade/index';
import Faq from './components/Faq/index';

async function getLeaderboard() {
	// const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard`)
	// const leaderboard = await res.json()
	// return leaderboard
	await client.connect();
	let leaderboard = await client.ZRANGEBYSCORE_WITHSCORES('leaderboard', '-inf', '+inf');
	leaderboard = leaderboard.sort((a, b) => b.score - a.score);
	await client.quit();
	return leaderboard;
}

export default async function Home() {
	const leaderboard = await getLeaderboard();
	console.log(leaderboard);
	return (
		<main>
			<Banner />
			<Companies />
			<Work leaderboard={leaderboard} />
			<Table leaderboard={leaderboard} />
			<Features />
			<Simple />
			<Trade />
			<Faq />
		</main>
	);
}
