'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import LetterAvatar from '../LetterAvatar';
import UserAvatar from '../Avatar';
import DuelLogs from '../DuelLogs';

const Table = ({ ranking, title = 'Ranking', banlistname, className = "mx-auto max-w-7xl px-6" }) => {
	const lastUpdated = new Date(ranking.lastUpdated);
	const leaderboard = ranking.data ?? [];

	const [duels, setDuels] = useState([]);
	const [isOpenDuelLogs, setIsOpenDuelLogs] = useState(false);
	const handleOpenDuelLogs = async (username) => {

		const res = await fetch(`/api/user/duels?username=${username}&banlistname=${banlistname}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (res.ok) {
			const duels = await res.json();
			setDuels(duels);
			setIsOpenDuelLogs(true);

			// setAnchorEl2(null);
			toast.success('Duel logs fetched successfully');
		} else {
			toast.error('Error while fetching duel logs');
		}
	};

	return (
		<>
			<div className={className} id='ranking-section'>
				<div className='table-b bg-navyblue p-8 overflow-x-auto'>
					<h3 className='text-offwhite text-2xl'>{title}</h3>
					<p className='text-bluish text-sm font-normal leading-8'>
						Last updated on {lastUpdated.toLocaleString()}
					</p>
					<table className='table-auto w-full mt-10'>
						<thead>
							<tr className='text-white bg-darkblue rounded-lg'>
								<th className='px-4 py-4 font-normal'>RANK</th>
								<th className='px-4 py-4 text-start font-normal'>USERNAME</th>
								<th className='px-4 py-4 font-normal'>POINTS</th>
								<th className='px-4 py-4 font-normal'>GAMES</th>
								<th className='px-4 py-4 font-normal'>WINS</th>
								<th className='px-4 py-4 font-normal'>LOSSES</th>
								<th className='px-4 py-4 font-normal'>WINRATE</th>
								<th className='px-4 py-4 font-normal flex items-center'>
									<img
										src='/images/Table/up.svg'
										alt='up'
										width={16}
										height={16}
									/>
									<img
										src='/images/Table/down.svg'
										alt='down'
										width={16}
										height={16}
									/>
								</th>
							</tr>
						</thead>
						<tbody>
							{leaderboard.map((items, i) => (
								<tr
									key={i}
									className='border-b border-b-darkblue cursor-pointer hover:bg-purple'
									onClick={() => handleOpenDuelLogs(items.value)}
								>
									<td className='px-4 py-2 text-center text-white'>
										{items.position}
									</td>
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
									<td className='px-4 py-2 text-center text-white'>
										{items.wins + items.losses}
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
										<span className='text-xs'>
											{items.difference != 0 ? `${items.difference}` : ''}
										</span>
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
			{isOpenDuelLogs && (
				<DuelLogs
					isOpenDuelLogs={isOpenDuelLogs}
					setIsOpenDuelLogs={setIsOpenDuelLogs}
					duels={duels}
					banlistname={banlistname}
				/>
			)}
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
