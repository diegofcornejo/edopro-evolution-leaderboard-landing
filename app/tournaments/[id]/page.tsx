'use client';

import { Toaster } from 'react-hot-toast';

const getTournament = async (id) => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tournament/?id=${id}`, {
		cache: 'no-store',
	});
	const data = await res.json();

	return data;
};

export default async function Home({ params }: { params: { id: string } }) {
	const id = params.id;
	if (!id) return <div>loading ID...</div>;

	const tournament = await getTournament(id);

	return (
		<main>
				<div className='grid h-screen place-items-center text-white'>
					<h2>{tournament.id}</h2>
					<h1>{tournament.name}</h1>
					<h2>{tournament.banlist}</h2>
					<h2>{tournament.bestOf}</h2>
					<h2>{tournament.mode}</h2>
					<h2>{tournament.owner}</h2>
					<h2>{tournament.rule}</h2>
					<h2>{tournament.startDate}</h2>
				</div>
				<Toaster position='bottom-center' reverseOrder={false} />

		</main>
	);
}
