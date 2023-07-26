'use client';
import Image from 'next/image';
import LetterAvatar from '../LetterAvatar';
import UserAvatar from '../Avatar';

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
								<th className='px-4 py-4 text-start font-normal'>USERNAME</th>
								<th className='px-4 py-4 font-normal'>POINTS</th>
								<th className='px-4 py-4 font-normal'>WINS</th>
								<th className='px-4 py-4 font-normal'>LOSSES</th>
								<th className='px-4 py-4 font-normal'>WINRATE</th>
							</tr>
						</thead>
						<tbody>
							{leaderboard.map((items, i) => (
								<tr key={i} className='border-b border-b-darkblue'>
									<td className='px-4 py-2 text-center text-white'>{i + 4}</td>
									<td className='px-4 py-2 text-center text-white flex items-center justify-start gap-5 '>
										{items.avatar ? (
											<UserAvatar size={'40px'} avatarParts={items.avatar} />
										) : (
											<LetterAvatar
												name={items.value}
												size={40}
												fontSize={`1rem`}
											/>
										)}
										{items.value}
									</td>

									<td className='px-4 py-2 text-center text-white'>
										{items.score.toLocaleString()}
									</td>
									<td className='px-4 py-2 text-center text-green'>
										{items.wins.toLocaleString()}
									</td>
									<td className='px-4 py-2 text-center text-red'>
										{items.losses.toLocaleString()}
									</td>
									<td className='px-4 py-2 text-center text-white'>
										{items.winrate}%
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<Image
				src={'/images/Table/Footer.svg'}
				alt='ellipse'
				width={2460}
				height={102}
				className='md:mb-40 md:-mt-6'
			/>
		</>
	);
};

export default Table;
