'use client';
import { useWindowSize } from 'usehooks-ts';
import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
const matches = require('./matches.json');

const SingleElimination = () => {
	// const { width, height } = useWindowSize();
	// const finalWidth = Math.max(width - 100, 500);
	// const finalHeight = Math.max(height - 100, 500);
	return (
		<div className='grid place-items'>
			<div className='mx-auto max-w-7xl'>
				<SingleEliminationBracket
					matches={matches}
					matchComponent={Match}
					options={{
						style: {
							roundHeader: {
								// backgroundColor: '#f00',
								// fontColor: '#f00',
							},
							// connectorColor: '#f00',
							// connectorColorHighlight: '#f00',
						},
					}}
					svgWrapper={({ children, ...props }) => (
						<SVGViewer SVGBackground='#13224F' width={1250} height={750} {...props}>
							{children}
						</SVGViewer>
					)}
				/>
			</div>
		</div>
	);
};

export default SingleElimination;
