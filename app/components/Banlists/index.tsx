'use client';
import Image from 'next/image';
import { ArrowDownTrayIcon, EyeIcon, PencilSquareIcon } from '@heroicons/react/20/solid';

const Table = ({ banlists }) => {

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
								<th className='px-4 py-4 text-start font-normal'>NAME</th>
								<th className='px-4 py-4 font-normal'>VERSION</th>
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
									<td className='px-4 py-2 text-white'>{items.name}</td>
									<td className='px-4 py-2 text-center text-white'>{items.version}</td>
									<td className='px-4 py-2 text-white flex gap-x-4'>
										<EyeIcon className='h-4 w-4 text-white cursor-pointer hover:text-purple' title='View'/>
										<ArrowDownTrayIcon className='h-4 w-4 text-white cursor-pointer hover:text-purple' title='Download'/>
										<PencilSquareIcon className='h-4 w-4 text-white cursor-pointer hover:text-purple' title='Edit'/>
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
