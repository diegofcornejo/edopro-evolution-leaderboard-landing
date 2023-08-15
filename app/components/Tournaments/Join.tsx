import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import toast from 'react-hot-toast';

const JoinTournament = ({ isJoinOpen, setIsJoinOpen, tournament }) => {
	
	const handleJoinTournament = async (e) => {
		e.preventDefault();
		const session = localStorage.getItem('session');
		const token = session ? JSON.parse(session).token : '';

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tournament/join`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				tournamentId: tournament.id,
			})
		});
		const res = await response.json();
		if (response.ok) {
			toast.success(res.message, { duration: 5000 });
			tournament.ranking.data.push(res.player);
		} else {
			toast.error(res.error, { duration: 5000 });
		}
		closeModal();
	};

	const closeModal = () => {
		setIsJoinOpen(false);
	};

	return (
		<>
			<Transition appear show={isJoinOpen} as={Fragment}>
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
													Are you sure you want to join to <br /> 
													{tournament.name}?
												</h2>
											</div>
											<div className='mt-8 space-y-6'>
												<div className='flex justify-center'>
													<button
														type='button'
														className='group relative flex w-full justify-center rounded-md border border-transparent bg-purple py-2 px-4 text-sm font-medium text-white hover:bg-buttonblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
														onClick={handleJoinTournament}
													>
														Join
													</button>
												</div>
											</div>
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

export default JoinTournament;
