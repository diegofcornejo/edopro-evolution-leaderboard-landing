import { Toaster } from 'react-hot-toast';
import Banner from '@/app/components/Banner/Tournament';
import Table from '@/app/components/Table';
import SingleElimination from '@/app/components/Brackets';

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
	tournament.id = id;

	const ChallongeIframe = (url) => {
		const iframeUrl = `${url}/module`;
		return (
			<div className='mx-auto max-w-7xl'>
				<iframe
					src={iframeUrl}
					width="100%"
					height="650"
					frameBorder="0"
					scrolling="auto"
					title="Challonge Iframe"
				></iframe>
			</div>
		);
	};

	const Viewer = () => {
		if (tournament.type === 'single') {
			return <SingleElimination />;
		} else if (tournament.type === 'league') {
			return <Table ranking={tournament.ranking} banListName='' />;
		} else {
			return <div>Unknown tournament type</div>;
		}
	}

	return (
		<main>
			<Banner tournament={tournament} />
			{/* <Viewer /> */}
			{ChallongeIframe(tournament.url)}
			<Toaster position='bottom-center' reverseOrder={false} />
		</main>
	);
}
