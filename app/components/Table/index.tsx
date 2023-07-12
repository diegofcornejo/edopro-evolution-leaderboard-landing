'use client';
import Image from 'next/image';

const Table = ({ leaderboard }) => {
	return (
		<>
			<div className='mx-auto max-w-7xl pt-40 px-6' id='exchange-section'>
				<div className='table-b bg-navyblue p-8 overflow-x-auto'>
					<h3 className='text-offwhite text-2xl'>EDOPro Ranking</h3>
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
									<td className='px-4 py-6 text-center text-white'>{i+1}</td>
									<td className='px-4 py-6 text-center text-white flex items-center justify-start gap-5 '>
										{/* <Image
											src={items.imgSrc}
											alt={items.imgSrc}
											height={50}
											width={50}
										/> */}
										<img src={'https://cdn.discordapp.com/avatars/489192723132317696/41c41bcaf349e1bf8e386ba8351c89f2.webp?size=160'} alt={''} width={50} height={50} className='rounded-full'/>
										{items.value}
									</td>
									<td className='px-4 py-6 text-center text-white'>
										{items.score.toLocaleString()}
									</td>
									<td className='px-4 py-6 text-center text-green'>
										{items.wins.toLocaleString()}
									</td>
									<td className='px-4 py-6 text-center text-red'>
                                        {items.losses.toLocaleString()}
									</td>
									<td className='px-4 py-6 text-center text-white'>
										{items.winrate}%
									</td>
									{/* <td className={`px-4 py-6 text-center ${items.change < 0 ? 'text-red' : 'text-green'} `}>{items.change}%</td>
                                    <td className="px-4 py-6 text-center text-white">${items.cap.toLocaleString()}</td>
                                    <td className={`px-4 py-6 text-center ${items.action === 'Buy' ? 'text-green' : 'text-red'}`}>
                                        {items.action}
                                    </td> */}
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
