'use client';
import Image from 'next/image';
import LetterAvatar from '../LetterAvatar';
import UserAvatar from '../Avatar';
// import Snowfall from 'react-snowfall';

const Top = ({ leaderboard }) => {
	console.log("🚀 ~ Top ~ leaderboard:", leaderboard.data)
	
	// leaderboard.sort((a, b) => b.score - a.score);
	let topThree = leaderboard.data?.slice(0, 3);
	// topThree = topThree.map((item, i) => {
	// 	return {
	// 		...item,
	// 		rank: i + 1,
	// 	};
	// });

	return (
		<div>
			{/* <Snowfall /> */}
			<div className='mx-auto max-w-7xl mt-16 px-6 mb-20 relative'>
				<div className='radial-bgone hidden lg:block'></div>
				<div className='text-center mb-14'>
					<h3 className='text-offwhite text-3xl md:text-5xl font-bold mb-3'>
						Top Players
					</h3>
					<p className='text-bluish md:text-lg font-normal leading-8'>
						Explore the top players in our community. Discover who the standout
						competitors are in our tournaments and events.
						<br /> Get to know their achievements, strategies, and stay updated with the
						rankings.
					</p>
				</div>

				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-5 mt-32'>
					{topThree?.map((items, i) => (
						<div
							className={
								`card-b p-8 order-${i} ` +
								(i === 0 ? 'gold lg:-mt-8' : '') +
								(i === 1 ? 'silver lg:order-first' : '') +
								(i === 2 ? 'bronze' : '')
							}
							key={i}
						>
							<div className='work-img-bg rounded-full flex justify-center absolute p-6'>
								<img
									src={`/images/Top/${items.position}.svg`}
									alt={''}
									width={32}
									height={32}
									className='rounded-full'
									style={{ position: 'absolute', top: '0', right: '0' }}
								/>
								{items.avatar ? (
									<UserAvatar size={'50px'} avatarParts={items.avatar} />
								) : (
									<LetterAvatar name={items.value} size={50} />
								)}
							</div>
							<div>
								<Image
									src={'/images/Work/bg-arrow.svg'}
									alt='arrow-bg'
									width={85}
									height={35}
								/>
							</div>
							<h3 className='text-2xl text-offwhite font-semibold text-center mt-8'>
								#{items.position} {items.value}
							</h3>
							<p className='text-base font-normal text-bluish text-center mt-2'>
								Points: {items.score}
							</p>
							<p className='text-base font-normal text-bluish text-center mt-2 text-green'>
								Wins: {items.wins}
							</p>
							<p className='text-base font-normal text-bluish text-center mt-2 text-red'>
								Losses: {items.losses}
							</p>
							<p className='text-base font-normal text-bluish text-center mt-2 mb-2'>
								Winrate: {items.winrate}%
							</p>
							<div className='flex justify-center gap-2'>
								{items.winrate >= 75 ? (
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
								{items.winrate == 100 ? (
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
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Top;
