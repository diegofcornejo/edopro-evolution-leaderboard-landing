'use client';
import Image from 'next/image';

const Banner = ({tournament}) => {

	return (
		<div className='bg-image relative' id='home-section'>
			<div className='arrowOne'></div>
			<div className='radial-banner hidden lg:block'></div>
			<div className='mx-auto max-w-7xl pt-16 lg:pt-20 sm:pb-12 px-6'>
				<div className='height-work'>
					<div className='grid grid-cols-1 lg:grid-cols-12 my-16'>
						<div className='arrowTwo'></div>
						<div className='col-span-7'>
							<h1 className='text-2xl lg:text-5xl font-bold mb-5 text-white md:4px md:text-start text-center'>
								{tournament.name}
							</h1>
							<p className='text-white md:text-lg font-normal mb-10 md:text-start text-center'>
								 <span className="font-bold">Banlist:</span> {tournament.banlist}<br />
								 <span className="font-bold">Best of:</span> {tournament.bestOf}<br />
								 <span className="font-bold">Mode:</span> {tournament.mode} vs {tournament.mode}<br />
								 <span className="font-bold">Rule:</span> {tournament.rule}<br />
								 <span className="font-bold">Start Date:</span> {tournament.startDate}<br />
								 <span className="font-bold">Owner:</span> {tournament.owner}
							</p>
							<div className='flex align-middle justify-center md:justify-start'>
									<button className='text-xl font-semibold text-white py-4 px-6 lg:px-12 navbutton mr-6'>
										Join
									</button>
									<button className='text-xl font-semibold text-white py-4 px-6 lg:px-12 navbutton mr-6'>
										Create Room
									</button>
							</div>
						</div>

						<div className='col-span-4 lg:-m-48'>
							<div className='arrowThree'></div>
							<div className='arrowFour'></div>
							<div className='arrowFive'></div>
							<Image
								src='/images/Banner/banner_evolution.png'
								alt='nothing'
								width={512}
								height={200}
								style={{ float: 'right', paddingTop: '12rem' }}
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
