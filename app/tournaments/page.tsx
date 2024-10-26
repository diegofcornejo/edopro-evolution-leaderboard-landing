import { Toaster } from 'react-hot-toast';
import Tournaments from '../components/Tournaments/index';

const getTournaments = async () => {
	// const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tournament`,{ cache: 'no-store' });
	// const data = await res.json();
	// return data;
	return [];
}

export default async function Home() {
	const tournaments = await getTournaments();
	return (
		<main>
			<Tournaments tournaments = {tournaments} />
			<Toaster position="bottom-center" reverseOrder={false}/>
		</main>
	);
}