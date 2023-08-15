'use client';

import { Toaster } from 'react-hot-toast';
import Banner from '@/app/components/Banner/Tournament';
import Table from '@/app/components/Table';

const getTournament = async (id) => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tournament/?id=${id}`, {
		cache: 'no-store',
	});
	const data = await res.json();
	return data;
};

//check if user is already joines
const checkUser = (players) => {
	const session = localStorage.getItem('session');
	const username = session ? JSON.parse(session).username : '';
	const user = players.find((player) => player.value === username);
	return user ? true : false;
}

export default async function Home({ params }: { params: { id: string } }) {
	const id = params.id;
	if (!id) return <div>loading ID...</div>;

	const tournament = await getTournament(id);
	tournament.id = id;
	tournament.joined = checkUser(tournament.ranking.data);

	return (
		<main>
				<Banner tournament={tournament} />
				<Table ranking={tournament.ranking} />
				<Toaster position='bottom-center' reverseOrder={false} />

		</main>
	);
}
