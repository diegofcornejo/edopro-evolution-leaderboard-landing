import { Toaster } from 'react-hot-toast';
import Banlists from '../components/Banlists/index';

const getTournaments = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tournament`,{ cache: 'no-store' });
	const data = await res.json();
	return data;
}

export default async function Home() {
	const tournaments = await getTournaments();
	return (
		<main>
			<Banlists tournaments = {tournaments} />
			<Toaster position="bottom-center" reverseOrder={false}/>
		</main>
	);
}