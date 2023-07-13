import Link from 'next/link';

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
					We recommend downloading the official EDOPro client.
				</p>
				<div className='flex justify-center '>
					<Link href='https://discord.gg/ygopro-percy' rel="noopener noreferrer" target="_blank">
						<button className='text-xl font-semibold text-white py-4 px-6 lg:px-12 navbutton'>
							Download
						</button>
					</Link>
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
