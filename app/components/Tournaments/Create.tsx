import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState} from 'react';
import toast from 'react-hot-toast';
import { camelCaseToWords } from '../../../libs/helpers';
import options from './options';

const CreateTournament = ({ isCreateOpen, setIsCreateOpen }) => {
	
	const [tournamentOptions, setTournamentOptions] = useState({
		name: '',
		type: '',
		status: '',
		start: '',
		banlist: '',
		mode: '',
		bestOf: '',
		rules: '',
	});
	

	const handleChange = (option, value) => {
		setTournamentOptions((prevParts) => ({
			...prevParts,
			[option]: value,
		}));
	};

	const handleCreateTournament = async (e) => {
		e.preventDefault();
		console.log(tournamentOptions);
		// const token = localStorage.getItem('token');
		// const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/avatar`, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Authorization: `Bearer ${token}`,
		// 	},
		// 	body: JSON.stringify({ avatar: avatarParts }),
		// });
		// const res = await response.json();
		// if (response.ok) {
		// 	toast.success('Avatar	saved ', { duration: 5000 });
		// } else {
		// 	toast.error(res.error, { duration: 5000 });
		// }
	};

	const closeModal = () => {
		setIsCreateOpen(false);
	};

	return (
		<>
			<Transition appear show={isCreateOpen} as={Fragment}>
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
													New Tournament
												</h2>
											</div>
											<form
												className='mt-8 space-y-6'
												onSubmit={handleCreateTournament}
											>
												<div className='-space-y-px rounded-md shadow-sm'>
														<div>
														<label
															htmlFor='signup-username'
															className='sr-only'
														>
															Username
														</label>
														<input
															id='signup-username'
															name='username'
															type='text'
															value={tournamentOptions.name}
															onChange={(e) => {
																if (e.target.value.length <= 40) {
																	handleChange('name', e.target.value);
																}
															}}
															pattern='^\S+$'
															title='Spaces are not allowed'
															autoComplete='signup-username'
															required
															maxLength={14}
															className='relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
															placeholder='Username'
														/>
														</div>
												</div>
												<div>
													<button
														type='submit'
														className='group relative flex w-full justify-center rounded-md border border-transparent bg-purple py-2 px-4 text-sm font-medium text-white hover:bg-buttonblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
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

export default CreateTournament;
