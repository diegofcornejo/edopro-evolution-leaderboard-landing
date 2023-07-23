'use client';
import Image from 'next/image';
import LetterAvatar from '../LetterAvatar';

const Table = ({ leaderboard }) => {
	leaderboard.splice(0, 3);
	return (
		<>
			<div className='mx-auto max-w-7xl px-6' id='ranking-section'>
				<div className='table-b bg-navyblue p-8 overflow-x-auto'>
					<h3 className='text-offwhite text-2xl'>Ranking (Top 20)</h3>
					<table className='table-auto w-full mt-10'>
						<thead>
							<tr className='text-white bg-darkblue rounded-lg'>
								<th className='px-4 py-4 font-normal'>RANK</th>
								<th className='px-4 py-4 text-start font-normal'>USER</th>
								<th className='px-4 py-4 font-normal'>POINTS</th>
								<th className='px-4 py-4 font-normal'>WINS</th>
								<th className='px-4 py-4 font-normal'>LOSSES</th>
								<th className='px-4 py-4 font-normal'>WINRATE</th>
							</tr>
						</thead>
						<tbody>
							{leaderboard.map((items, i) => (
								<tr key={i} className='border-b border-b-darkblue'>
									<td className='px-4 py-4 text-center text-white'>{i+4}</td>
									<td className='px-4 py-4 text-center text-white flex items-center justify-start gap-5 '>
										<LetterAvatar name={items.value} size={56}/>
										{items.value}
									</td>
									
									<td className='px-4 py-4 text-center text-white'>
										{items.score.toLocaleString()}
									</td>
									<td className='px-4 py-4 text-center text-green'>
										{items.wins.toLocaleString()}
									</td>
									<td className='px-4 py-4 text-center text-red'>
                                        {items.losses.toLocaleString()}
									</td>
									<td className='px-4 py-4 text-center text-white'>
										{items.winrate}%
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<Image
				src={'/images/Table/Untitled.svg'}
				alt='ellipse'
				width={2460}
				height={102}
				className='md:mb-40 md:-mt-6'
			/>
		</>
	);
};

export default Table;
