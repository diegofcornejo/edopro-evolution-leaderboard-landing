'use client';
import Image from 'next/image';
import LetterAvatar from '../LetterAvatar';

const Top = ({ leaderboard }) => {
	leaderboard.sort((a, b) => b.score - a.score);
	let topThree = leaderboard.slice(0, 3);
	topThree[0].rank = 1;
	topThree[1].rank = 2;
	topThree[2].rank = 3;
	let leaders = [topThree[1], topThree[0], topThree[2]];

	return (
		<div>
			<div className='mx-auto max-w-7xl mt-16 px-6 mb-20 relative' id='topplayers-section'>
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
					{leaders.map((items, i) => (
						<div className='card-b p-8' key={i}>
							<div className='work-img-bg rounded-full flex justify-center absolute p-6'>
								{/* {i === 1 && ( */}
									<img
										src={`/images/Top/${items.rank}.svg`}
										alt={''}
										width={32}
										height={32}
										className='rounded-full'
										style={{ position: 'absolute', top: '0', right: '0' }}
									/>
								{/* )} */}
								{/* <img
									src={
										'https://cdn.discordapp.com/avatars/489192723132317696/41c41bcaf349e1bf8e386ba8351c89f2.webp?size=160'
									}
									alt={''}
									width={50}
									height={50}
									className='rounded-full'
								/> */}
								<LetterAvatar name={items.value} size={50}/>
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
								#{items.rank} {items.value}
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
							<span className='text-base font-normal m-0 text-bluish text-center hides'>
								Winrate: {items.winrate}%
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Top;
