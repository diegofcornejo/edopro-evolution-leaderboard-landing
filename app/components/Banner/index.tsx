'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';
import Link from 'next/link';
import { ShimmerButton } from '@/app/components/magicui/ShimmerButton';
import Snowfall from 'react-snowfall';

const Banner = () => {
	const [isOpen, setOpen] = useState(false);

	return (
		<div className='bg-image relative' id='home-section'>
			<div className='arrowOne'></div>
			<div className='radial-banner hidden lg:block'></div>
			<ModalVideo
				channel='youtube'
				isOpen={isOpen}
				videoId='p75116MjEoY'
				onClose={() => setOpen(false)}
			/>
			<Snowfall />

			<div className='mx-auto max-w-7xl pt-16 lg:pt-20 px-6'>
				<div className='height-work'>
					<div className='grid grid-cols-1 lg:grid-cols-12 my-16'>
						<div className='arrowTwo'></div>
						<div className='col-span-7'>
							<h1 className='text-4xl lg:text-7xl font-bold mb-5 text-white md:4px md:text-start text-center'>
								Evolution Server <br /> <span className='text-yellow-300 lg:text-8xl'>Season 2</span>
							</h1>
							<p className='text-white md:text-lg font-normal mb-10 md:text-start text-center'>
								Join a vibrant community of passionate players <br /> whether you
								are a novice starting in Monster Duel <br /> or an experienced
								duelist seeking new challenges.
							</p>
							<div className='flex align-middle justify-center md:justify-start'>
								<Link href='https://discord.gg/bgjddgWkWk' target='_blank'>
									{/* <button className='text-xl font-semibold text-white py-4 px-6 lg:px-12 navbutton mr-6'>
										<Image
											src={'/images/Banner/discord.svg'}
											alt=''
											width={40}
											height={40}
											style={{
												display: 'inline-block',
												verticalAlign: 'middle',
												paddingRight: '0.5rem',
											}}
										></Image>
										Join to Discord
									</button> */}
									<ShimmerButton>
										<Image
											src={'/images/Banner/discord.svg'}
											alt=''
											width={40}
											height={40}
											style={{
												display: 'inline-block',
												verticalAlign: 'middle',
												paddingRight: '0.5rem',
											}}
										></Image>
										<span className='whitespace-pre-wrap bg-gradient-to-b from-black from-30% to-gray-300/80 bg-clip-text text-center text-lg font-semibold leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 dark:text-transparent lg:text-2xl'>
											Join to Discord
										</span>
									</ShimmerButton>
								</Link>
								<button
									onClick={() => setOpen(true)}
									className='bg-transparent flex justify-center items-center text-white pl-2'
								>
									<Image
										src={'/images/Banner/playbutton.svg'}
										alt='button-image'
										className='mr-3'
										width={47}
										height={47}
									/>
									Tutorial
								</button>
							</div>
						</div>

						<div className='col-span-4 lg:-m-48'>
							<div className='arrowThree'></div>
							<div className='arrowFour'></div>
							<div className='arrowFive'></div>
							{/* <Image src="/images/Banner/banner.png" alt="nothing" width={1013} height={760} /> */}
							<Image
								src='/images/Banner/banner_evolution_xmas.png'
								alt='nothing'
								width={640}
								height={200}
								style={{ float: 'right', paddingTop: '9rem' }}
							/>
							<div className='arrowSix'></div>
							<div className='arrowSeven'></div>
							<div className='arrowEight'></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
