'use client';
import Image from 'next/image';
import LetterAvatar from '../LetterAvatar';
import UserAvatar from '../Avatar';

const Table = ({ tournaments }) => {
	// tournaments.splice(0, 3);
	return (
		<>
			<div className='mx-auto max-w-7xl px-6' id='ranking-section'>
				<div className='table-b bg-navyblue p-8 overflow-x-auto'>
					<h3 className='text-offwhite text-2xl'>Tournaments & Events</h3>
					<table className='table-auto w-full mt-10'>
						<thead>
							<tr className='text-white bg-darkblue rounded-lg'>
								<th className='px-4 py-4 font-normal'></th>
								<th className='px-4 py-4 font-normal'>NAME</th>
								<th className='px-4 py-4 text-start font-normal'>TYPE</th>
								<th className='px-4 py-4 font-normal'>CREATOR</th>
								<th className='px-4 py-4 font-normal'>STATUS</th>
								<th className='px-4 py-4 font-normal'>START</th>
								<th className='px-4 py-4 font-normal'>END</th>
								<th className='px-4 py-4 font-normal'>BANLIST</th>
								<th className='px-4 py-4 font-normal'>MODE</th>
								<th className='px-4 py-4 font-normal'>BESTOF</th>
								<th className='px-4 py-4 font-normal'>RULES</th>
							</tr>
						</thead>
						<tbody>
							{tournaments.map((items, i) => (
								<tr key={i} className='border-b border-b-darkblue'>
									<td className='px-4 py-2 text-center text-white'>{i + 1}</td>
									<td className='px-4 py-2 text-center text-white'>
										{items.name}
									</td>
									<td className='px-4 py-2 text-center text-white'>
										{items.type}
									</td>
									<td className='px-4 py-2 text-center text-white flex items-center justify-start gap-5 '>
										{/* {items.avatar ? (
											<UserAvatar size={'40px'} avatarParts={items.avatar} />
										) : (
											<LetterAvatar
												name={items.creator}
												size={40}
												fontSize={`1rem`}
											/>
										)} */}
										{items.creator}
									</td>
									<td className='px-4 py-2 text-center text-white'>
										{items.status}
									</td>
									<td className='px-4 py-2 text-center text-white'>
										{items.start}
									</td>
									<td className='px-4 py-2 text-center text-white'>
										{items.end}
									</td>
									<td className='px-4 py-2 text-center text-white'>
										{items.banlist}
									</td>
									<td className='px-4 py-2 text-center text-white'>
										{items.mode}
									</td>
									<td className='px-4 py-2 text-center text-white'>
										{items.bestof}
									</td>
									<td className='px-4 py-2 text-center text-white'>
										{items.rules}
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
