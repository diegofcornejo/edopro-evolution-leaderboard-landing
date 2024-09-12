'use client';

import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import LetterAvatar from '../LetterAvatar';
import UserAvatar from '../Avatar';
import DuelLogs from '../DuelLogs';
import { AuthContext } from '@/context/auth/AuthContext';

const Table = ({ ranking, title = 'Ranking', banListName, className = "mx-auto max-w-7xl px-6" }) => {

	const { isLoggedIn } = useContext(AuthContext);

	const lastUpdated = new Date(ranking.lastUpdated);
	const leaderboard = ranking.data ?? [];

	const [duels, setDuels] = useState<any[]>([]);
	const [isOpenDuelLogs, setIsOpenDuelLogs] = useState(false);

	const getDuelsByBanList = async (username, banListName) => {
		const res = await fetch(`/api/user/duels?username=${username}&banListName=${banListName}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (res.ok) {
			const duels = await res.json();
			return duels;
		} else {
			toast.error('Error while fetching duel logs');
		}
	};

	const handleOpenDuelLogs = async (username: string) => {
		if (!isLoggedIn) {
			toast.error('You need to login to view duels history', { duration: 5000 });
			const loginButton = document.getElementById('login-button');
			if (loginButton) loginButton.click();
			return;
		}

		let duels: any[] = [];

		if (Array.isArray(banListName)) {
			const duelPromises = banListName.map(banList => getDuelsByBanList(username, banList));
			const duelResultsArray = await Promise.all(duelPromises);
			duels = duelResultsArray.flat();
			duels.sort((a, b) => {
				const dateA = new Date(a.date).getTime();
				const dateB = new Date(b.date).getTime();
				return dateB - dateA;
			});
		} else {
			duels = await getDuelsByBanList(username, banListName);
		}

		setDuels(duels);
		setIsOpenDuelLogs(true);
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
							{leaderboard.map((item, index) => (
								<tr
									key={index}
									className='border-b border-b-darkblue cursor-pointer hover:bg-purple transition-colors duration-150 ease-in-out'
									onClick={() => handleOpenDuelLogs(item.username)}
								>
									<td className='px-4 py-2 text-center text-white'>
										{item.position}
									</td>
									<td className='px-4 py-2 text-center text-white flex items-center justify-start gap-5 '>
										{item.avatar ? (
											<UserAvatar size={'40px'} avatarParts={item.avatar} />
										) : (
											<LetterAvatar
												name="username"
												size={40}
												fontSize={`1rem`}
											/>
										)}
										{item.username}
										{item.winRate >= 75 ? (
											<img
												src='/images/Table/pro.webp'
												alt='pro'
												width={18}
												height={18}
												title='Pro Player'
											/>
										) : (
											''
										)}
										{item.winRate == 100 ? (
											<img
												src='/images/Table/invictus.webp'
												alt='invictus'
												width={18}
												height={18}
												title='Invictus'
											/>
										) : (
											''
										)}

									</td>
									<td className='px-4 py-2 text-center text-white'>
										{item.points.toLocaleString()}
									</td>
									<td className='px-4 py-2 text-center text-white'>
										{item.wins + item.losses}
									</td>
									<td className='px-4 py-2 text-center text-green'>
										{item.wins.toLocaleString()}
									</td>
									<td className='px-4 py-2 text-center text-red'>
										{item.losses.toLocaleString()}
									</td>
									<td className='px-4 py-2 text-center text-white'>
										{item.winRate}%
									</td>
									<td className='px-4 py-2 text-center text-white flex items-center justify-start gap-1'>
										{/* {items.difference > 0 ? (
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
										)} */}
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
					banlistname={banListName}
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
