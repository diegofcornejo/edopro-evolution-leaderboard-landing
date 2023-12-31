'use client'

import Marquee from '@/app/components/magicui/Marquee';
import { ReactNode, useContext, useState } from 'react';
import LetterAvatar from '../LetterAvatar';
import { RoomsContext } from '@/context/rooms/RoomsContext';
import { RealTimeRoom } from '@/modules/room/domain/RealTimeRoom';
import LiveRoomsTable from '../LiveRoomsTable';

const RoomCard = ({ players, turn, bestOf, banlist, notes }: RealTimeRoom, size?: string) => {
	const ranked = notes.includes('(Ranked)');
	return (
		<a
			target='_blank'
			rel='noopener noreferrer'
			className={`relative ${size === 'large'
				? 'min-w-[250px] border-yellow-300 hover:border-yellow-200'
				: 'min-w-[50px] border-slate-900 hover:border-slate-900/75'
				} flex justify-center items-center overflow-hidden rounded-xl border bg-slate-800/50 w-full py-4 px-12 transition hover:bg-slate-800/75 hover:shadow-lg group`}
		>
			<div className='flex flex-col items-center justify-center w-full h-auto gap-4 text-white transition group-hover:scale-110'>
				<div className='flex flex-row gap-10'>
					<p> {players[0].lps} </p>
					<p> {turn} </p>
					<p> {players[1].lps} </p>
				</div>
				<div className='flex items-center justify-center gap-5'>
					<div className='flex flex-col items-center gap-2'>
						<LetterAvatar name={players[0].username} size={40} fontSize={'0.75rem'} />
						<p className='text-xs'>{players[0].username}</p>
					</div>
					<p> {players[0].score} </p>
					<p className="text-xs"> VS </p>
					<p> {players[1].score} </p>
					<div className='flex flex-col items-center gap-2'>
						<LetterAvatar name={players[1].username} size={40} fontSize={'0.75rem'} />
						<p className='text-xs'>{players[1].username}</p>
					</div>
				</div>
				<div className='flex items-center justify-center gap-2'>
					<p className='text-sm text-white-900 overflow-ellipsis whitespace-nowrap max-w-xs'> Best of {bestOf} | {banlist.name}</p>
					{ranked &&<img src={'/images/Top/1.svg'} width={16}></img>}
				</div>
			</div>
		</a>
	);
};



const Live = () => {

	const [isOpenLiveRoomsTable, setIsOpenLiveRoomsTable] = useState(false);
	const handleOpenLiveRooms = () => {
		setIsOpenLiveRoomsTable(true);
	}
	const { rooms } = useContext(RoomsContext);

	return (
		<section className='flex flex-col flex-wrap items-center justify-center cursor-pointer' onClick={() => handleOpenLiveRooms()}>
			<div className='flex gap-2'>
				<div className='live-icon mb-4'></div>
				<span className='text-sm text-white'>Live</span>
			</div>
			<div className='relative flex flex-col items-center justify-center w-full h-full gap-4 overflow-hidden rounded-lg bg-background'>
				<div className={`relative ${rooms.length < 4 ? 'flex-row gap-x-4' : 'flex-col'} flex w-full overflow-hidden gap-y-4`}>
					{rooms.length < 4 ? (
						<>
							{rooms.map((room) => {
								return <RoomCard key={room.id} {...room} />;
							})}
						</>
					) : (
						<Marquee pauseOnHover className='[--duration:30s]'>
							{rooms.map((room) => {
								return <RoomCard key={room.id} {...room} />;
							})}
						</Marquee>
					)}

					<div className='absolute inset-y-0 left-0 w-40 pointer-events-none from-[#000214] to-transparent bg-gradient-to-r '></div>
					<div className='absolute inset-y-0 right-0 w-1/3 pointer-events-none bg-gradient-to-l from-[#000214]'></div>
				</div>
			</div>
			{isOpenLiveRoomsTable && (
				<LiveRoomsTable
					isOpenLiveRoomsTable={isOpenLiveRoomsTable}
					setIsOpenLiveRoomsTable={setIsOpenLiveRoomsTable}
					rooms={rooms}
				/>
			)}
		</section>
	);
};

export default Live;
