import Image from 'next/image';
import Link from 'next/link';

// MIDDLE LINKS DATA
interface ThanksLink {
	name: string;
	url: string;
}

interface ThanksType {
	id: number;
	section: string;
	links: ThanksLink[];
}

interface Social {
	imgsrc: string;
	href: string;
}

interface Dev {
	github: string;
	description: string;
}

// const thanks: ThanksType[] = [
// 	{
// 		id: 1,
// 		section: 'Special Thanks',
// 		links: [
// 			{ name: 'Dyxel', url: 'https://github.com/DyXel' },
// 			{ name: 'Dyxel', url: 'https://github.com/edo9300' },
// 			{ name: 'Project Ignis', url: 'https://projectignis.github.io' },
// 		],
// 	},
// ];

const socialLinks: Social[] = [
	{ imgsrc: '/images/Footer/insta.svg', href: 'https://instagram.com/' },
	{ imgsrc: '/images/Footer/dribble.svg', href: 'https://dribble.com/' },
	{ imgsrc: '/images/Footer/twitter.svg', href: 'https://twitter.com/' },
	{ imgsrc: '/images/Footer/youtube.svg', href: 'https://youtube.com/' },
];

const thanks: Dev[] = [
	{ github: 'DyXel', description: '' },
	{ github: 'edo9300', description: '' },
	{ github: 'ProjectIgnis', description: '' },
];

const team: Dev[] = [
	{ github: 'diangogav', description: 'Project Lead' },
	{ github: 'leip1493', description: 'Dev' },
	{ github: 'termitaklk', description: 'Dev' },
	{ github: 'leandrogavidia', description: 'Designer' },
	{ github: 'diegofcornejo', description: 'SRE & Ranking' }
];



const footer = () => {
	return (
		<div className=' relative'>
			<div className='radial-bg hidden lg:block'></div>
			<div className='mx-auto max-w-2xl mt-64 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
				<div className='mt-24 grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8'>
					{/* COLUMN-1 */}

					<div className='col-span-6'>
						<img
							className='block h-12 w-20px mb-4'
							src={'/images/Logo/logo.svg'}
							alt='Evolution-Logo'
						/>
						<h3 className='text-lightblue text-sm font-normal leading-9 mb-4 lg:mb-16'>
							Evolution is another server that utilizes the EDOPro core to facilitate
							Duel Monsters matches. However, our main focus lies in the scalability
							of the code, enabling effortless integration of new features associated
							with the data generated during duels
						</h3>
						<div className='flex gap-4'>
							{socialLinks.map((items, i) => (
								<Link href={items.href} key={i}>
									<img
										src={items.imgsrc}
										alt={items.imgsrc}
										className='footer-icons'
									/>
								</Link>
							))}
						</div>
					</div>

					{/* CLOUMN-2/3 */}

					{/* {thanks.map((thank) => (
						<div key={thank.id} className='col-span-3'>
							<p className='text-white text-xl font-medium mb-9'>{thank.section}</p>
							
								{thank.links.map((link, index) => (
									<h4 key={index} className='mb-5'>
										<Image
												src={'/images/Footer/github.svg'}
												alt='github-icon'
												width={20}
												height={20}
											/>
										<Link
											href={link.url}
											className='text-offwhite  text-sm font-normal mb-6 space-links'
											target='_blank'
										>
											{link.name}
										</Link>
									</h4>
								))}
							
						</div>
					))} */}

					<div className='col-span-3'>
						<h3 className='text-white text-xl font-medium mb-9'>Special Thanks To</h3>
						{/* <h4 className="text-offwhite text-sm font-normal mb-6 flex gap-2"><Image src={'/images/Footer/number.svg'} alt="number-icon" width={20} height={20} />(406) 555-012</h4> */}
						{thanks.map((item, i) => (
							<h4
								key={i}
								className='text-offwhite text-sm font-normal mb-6 flex gap-2'
							>
								<Image
									src={'/images/Footer/github.svg'}
									alt='github-icon'
									width={20}
									height={20}
								/>
								<Link href={`https://github.com/${item.github}`} target='_blank'>
									{item.github} {item.description}
								</Link>
							</h4>
						))}
						{/* <h4 className="text-offwhite text-sm font-normal mb-6 flex gap-2"><Image src={'/images/Footer/address.svg'} alt="address-icon" width={20} height={20} />Elgin St. Celina, Delaware 10299</h4> */}
					</div>

					<div className='col-span-3'>
						<h3 className='text-white text-xl font-medium mb-9'>Team</h3>
						{/* <h4 className="text-offwhite text-sm font-normal mb-6 flex gap-2"><Image src={'/images/Footer/number.svg'} alt="number-icon" width={20} height={20} />(406) 555-012</h4> */}
						{team.map((item, i) => (
							<h4
								key={i}
								className='text-offwhite text-sm font-normal mb-6 flex gap-2'
							>
								<Image
									src={'/images/Footer/github.svg'}
									alt='github-icon'
									width={20}
									height={20}
								/>
								<Link href={`https://github.com/${item.github}`} target='_blank'>
									{item.github} ({item.description})
								</Link>
							</h4>
						))}
						{/* <h4 className="text-offwhite text-sm font-normal mb-6 flex gap-2"><Image src={'/images/Footer/address.svg'} alt="address-icon" width={20} height={20} />Elgin St. Celina, Delaware 10299</h4> */}
					</div>
				</div>
			</div>

			{/* All Rights Reserved */}

			<div className='py-8 px-4 border-t border-t-lightblue'>
				<h3 className='text-center text-offwhite'>
					We Love Open Source ❤️. You can find the code for the{' '}
					<Link href='https://github.com/diangogav/EDOpro-server-ts' target='_blank' className='text-buttonblue dark:text-buttonblue hover:underline'>
						{' '}
						Server
					</Link>
					{' '} and the
					<Link href='https://github.com/diegofcornejo/edopro-evolution-leaderboard-landing' target='_blank' className='text-buttonblue dark:text-buttonblue hover:underline'>
						{' '}
						Web
					</Link>
				</h3>
			</div>
		</div>
	);
};

export default footer;
