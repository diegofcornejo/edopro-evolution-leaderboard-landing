'use client';
import Image from 'next/image';
import { ArrowDownTrayIcon, EyeIcon, ArrowUpTrayIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import UploadBanlist from './Upload';

const githubURLRepo = 'https://raw.githubusercontent.com/termitaklk/lflist/main';
// Download file from github
const downloadFile = (name) => {
	const url = `${githubURLRepo}/${name}`;
	fetch(url)
		.then((response) => response.blob())
		.then((blob) => {
			const blobUrl = window.URL.createObjectURL(new Blob([blob]));
			const a = document.createElement('a');
			a.href = blobUrl;
			a.download = name;
			a.click();
		});
};

// View banlists in github
const viewBanlist = (name) => {
	const url = `${githubURLRepo}/${name}`;
	window.open(url, '_blank');
};

const Table = ({ banlists }) => {
	const [isUploadOpen, setIsUploadOpen] = useState(false);

	const handleUploadBanlist = () => {
		setIsUploadOpen(true);
	};

	return (
		<>
			<div className='mx-auto max-w-7xl px-6' id='ranking-section'>
				<div className='table-b bg-navyblue p-8 overflow-x-auto'>
					<div className='flex justify-between'>
						<h3 className='text-offwhite text-2xl'>Banlists Manager</h3>

					</div>
					<table className='table-auto w-full mt-10'>
						<thead>
							<tr className='text-white bg-darkblue rounded-lg'>
								<th className='px-4 py-4 text-start font-normal'>COMMUNITY</th>
								<th className='px-4 py-4 text-start font-normal'>IDENTIFIER</th>
								<th className='px-4 py-4 text-start font-normal'>FILENAME</th>
								<th className='px-4 py-4 font-normal'>NAME (Example)</th>
								<th className='px-4 py-4 text-start font-normal'></th>
							</tr>
						</thead>
						<tbody>
							{banlists.map((items, i) => (
								<tr
									key={i}
									className='border-b border-b-darkblue'
								>
									<td className='px-4 py-2 text-white'>{items.community}</td>
									<td className='px-4 py-2 text-white'>{items.identifier}</td>
									<td className='px-4 py-2 text-white'>{items.filename}</td>
									<td className='px-4 py-2 text-center text-white'>{items.identifier} - Banlist</td>
									<td className='px-4 py-2 text-white flex gap-x-4'>
										<EyeIcon className='h-4 w-4 text-white cursor-pointer hover:text-purple' title='View' onClick={() => viewBanlist(items.filename)} />
										<ArrowDownTrayIcon className='h-4 w-4 text-white cursor-pointer hover:text-purple' title='Download' onClick={() => downloadFile(items.filename)} />
										<ArrowUpTrayIcon className='h-4 w-4 text-white cursor-pointer hover:text-purple' title='Upload' onClick={handleUploadBanlist} />
										<UploadBanlist
											isUploadOpen={isUploadOpen}
											setIsUploadOpen={setIsUploadOpen}
											banlist={items}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
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
