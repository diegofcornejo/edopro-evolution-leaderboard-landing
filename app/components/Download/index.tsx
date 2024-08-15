import Link from 'next/link';

type Client = {
	name: string;
	url: string;
};

const clients: Client[] = [
	{
		name: 'Koishi Pro',
		url: 'https://koishi.pro/download/',
	},
	{
		name: 'YGO Mobile',
		url: 'https://ygom.top/',
	},
	{
		name: 'EDOPro (Recommended)',
		url: 'https://projectignis.github.io/download.html',
	},
	{
		name: 'MDPro3 Windows',
		url: 'https://www.mediafire.com/folder/mxhs3xpc26nme/Window',
	},
	{
		name: 'MDPro3 Android',
		url: 'https://www.mediafire.com/folder/aa8cr3joj1evv/Android',
	}
];

const Download = () => {
	return (
		<div className='simple-bg relative' id='download-section'>
			<div className='simpleone'></div>
			<div className='simpletwo'></div>
			<div className='simplethree'></div>
			<div className='simplefour'></div>
			<div className='simplefive'></div>
			<div className='mx-auto max-w-5xl py-24 px-6'>
				<h3 className='text-center text-offwhite text-3xl lg:text-5xl font-semibold mb-6'>
					Ready to duel? <br /> Just download a client
				</h3>
				<p className='text-center text-bluish text-lg font-normal mb-8'>
					Evolution does not have its own client. <br />
					We recommend downloading the official EDOPro client or any of the other clients listed below.
				</p>
				<div className='flex justify-center '>
					{clients.map((client) => (
						<Link href={client.url} key={client.name} rel="noopener noreferrer" target="_blank">
							<button className='text-xl font-semibold text-white py-4 px-6 lg:px-12 navbutton mr-4'>
								{client.name}
							</button>
						</Link>
					))}
					{/* <Link href='https://projectignis.github.io/download.html' rel="noopener noreferrer" target="_blank">
						<button className='text-xl font-semibold text-white py-4 px-6 lg:px-12 navbutton'>
							Download
						</button>
					</Link> */}
				</div>
			</div>
			<div className='simplesix'></div>
			<div className='simpleseven'></div>
			<div className='simpleeight'></div>
			<div className='simplenine'></div>
			<div className='simpleten'></div>
		</div>
	);
};

export default Download;
