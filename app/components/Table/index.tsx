'use client';
import Image from 'next/image';
import LetterAvatar from '../LetterAvatar';
import UserAvatar from '../Avatar';

const Table = ({ ranking }) => {
	const lastUpdated = new Date(ranking.lastUpdate);
	const leaderboard = ranking.data;
	
	return (
		<>
			<div className='mx-auto max-w-7xl px-6' id='ranking-section'>
				<div className='table-b bg-navyblue p-8 overflow-x-auto'>
					<h3 className='text-offwhite text-2xl'>Ranking (Top 20)</h3>
					<p className='text-bluish text-sm font-normal leading-8'>
						Last updated on {lastUpdated.toLocaleString()}
					</p>
					<table className='table-auto w-full mt-10'>
						<thead>
							<tr className='text-white bg-darkblue rounded-lg'>
								<th className='px-4 py-4 font-normal'>RANK</th>
								<th className='px-4 py-4 text-start font-normal'>USERNAME</th>
								<th className='px-4 py-4 font-normal'>POINTS</th>
								<th className='px-4 py-4 font-normal'>WINS</th>
								<th className='px-4 py-4 font-normal'>LOSSES</th>
								<th className='px-4 py-4 font-normal'>WINRATE</th>
								<th className='px-4 py-4 font-normal flex items-center'>
								<img
										src='/images/Table/down.svg'
										alt='down'
										width={16}
										height={16}
									/>
									<img
										src='/images/Table/up.svg'
										alt='up'
										width={16}
										height={16}
									/>
								</th>
							</tr>
						</thead>
						<tbody>
							{leaderboard.map((items, i) => (
								<tr key={i} className='border-b border-b-darkblue'>
									<td className='px-4 py-2 text-center text-white'>{items.position}</td>
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
									<td className='px-4 py-2 text-center text-white flex items-center justify-start gap-1'>
										{items.difference > 0 ? (
											<img
												src='/images/Table/up.svg'
												alt='up'
												width={16}
												height={16}
											/>
										) : items.difference < 0 ? (
											<img
												src='/images/Table/down.svg'
												alt='down'
												width={16}
												height={16}
											/>
										) : (
											''
										)}
										{items.difference != 0 ? `( ${items.difference} )` : ''}
										{items.new ? (
											<img
												src='/images/Table/new.png'
												alt='new'
												width={16}
												height={16}
											/>
										) : (
											''
										)}
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
