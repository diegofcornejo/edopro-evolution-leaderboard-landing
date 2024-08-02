import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import toast from 'react-hot-toast';
// import { camelCaseToWords } from '../../../libs/helpers';
import options from './options';

const UploadBanlist = ({ isUploadOpen, setIsUploadOpen, banlist }) => {
	const [tournamentOptions, setTournamentOptions] = useState({
		id: '',
		name: '',
		startDate: new Date().toISOString().slice(0, 10),
		banlist: '',
		mode: '',
		bestOf: '',
		rule: '',
		type: ''
	});

	const handleChange = (option, value) => {
		setTournamentOptions((prevParts) => ({
			...prevParts,
			[option]: value,
		}));
	};

	const handleUploadBanlist = async (e) => {
		e.preventDefault();
		console.log('Uploaderd');
		// const session = localStorage.getItem('session');
		// const token = session ? JSON.parse(session).token : '';

		// const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tournament`, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Authorization: `Bearer ${token}`,
		// 	},
		// 	body: JSON.stringify(tournamentOptions),
		// });
		// const res = await response.json();
		// if (response.ok) {
		// 	toast.success(res.message, { duration: 5000 });
		// 	tournamentOptions.id = res.tournamentId;
		// 	// tournaments.push(tournamentOptions);
		// } else {
		// 	toast.error(res.error, { duration: 5000 });
		// }
		closeModal();
	};

	const closeModal = () => {
		setIsUploadOpen(false);
	};

	return (
		<>
			<Transition appear show={isUploadOpen} as={Fragment}>
				<Dialog as='div' className='relative z-50' onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-black bg-opacity-25' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex min-h-full items-center justify-center p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
							>
								<Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-2xl bg-darkpurple border border-white p-6 text-left align-middle shadow-xl transition-all'>
									<div className='flex min-h-full items-center justify-center py-2 px-4 sm:px-6 lg:px-8'>
										<div className='w-full max-w-lg space-y-8'>
											<div>
												<h2 className='mt-6 text-center text-xl tracking-tight text-white'>
													Upload a new banlist version
												</h2>
												<p className='mt-2 text-center text-sm text-gray-400'>
													<span className='text-red'>WARNING</span>
													: This action will replace the current banlist version.
												</p>
												<p className='mt-2 text-center text-sm text-gray-400'>
													All changes made to the banlist will be reflected after the next server restart at 03:00 UTC, you can continue making changes until then.
												</p>
											</div>
											<form
												className='mt-8 space-y-6'
												onSubmit={handleUploadBanlist}
											>
												<div className='space-y-2 rounded-md shadow-sm'>
													<label htmlFor='name' className='block text-sm font-medium text-white'>
														Select a banlist file
													</label>
													<div className='mt-1'>
														<input
															id='name'
															name='name'
															type='file'
															required
															className='block w-full shadow-sm sm:text-sm focus:ring-buttonblue focus:border-buttonblue border-gray-300 rounded-md'
															onChange={(e) => handleChange('name', e.target.value)}
														/>
													</div>
												</div>
												<div>
													<button
														type='submit'
														className='group relative flex w-full justify-center rounded-md border border-transparent bg-purple py-2 px-4 text-sm font-medium text-white hover:bg-buttonblue focus:outline-none focus:ring-2 focus:ring-buttonblue focus:ring-offset-2'
													>
														Save
													</button>
												</div>
											</form>
										</div>
									</div>
									<div className='mt-4 flex justify-end'>
										<button
											type='button'
											className='inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white hover:text-purple focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
											onClick={closeModal}
										>
											Close
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default UploadBanlist;
