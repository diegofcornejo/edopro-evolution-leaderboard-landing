import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useContext } from 'react';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/20/solid';
import { AuthContext } from '@/context/auth/AuthContext';

const SendMessage = () => {
	let [isOpen, setIsOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [reason, setReason] = useState('');
	const [requestMessage, setRequestMessage] = useState('');
	const [error, setError] = useState(false);

	const { user } = useContext(AuthContext);
	const token = user?.token || '';

	const cleanForm = () => {
		setMessage('');
		setReason('');
		setRequestMessage('');
		setError(false);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const openModal = () => {
		cleanForm();
		setIsOpen(true);
	};

	const handleSendMessage = async (e) => {
		e.preventDefault();
		setRequestMessage('');
		setError(false);
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/message`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ message, reason }),
		});
		const res = await response.json();
		if (response.ok) {
			setRequestMessage(res.message);
		} else {
			setError(true);
			setRequestMessage(res.error);
		}
	};

	return (
		<>
			<div className='relative min-lg:absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto  sm:pr-0'>
				<div className='block md:block'>
					<ChatBubbleBottomCenterTextIcon
						onClick={openModal}
						className='h-8 w-8 text-indigo-500 group-hover:text-indigo-400 cursor-pointer'
						aria-hidden='true'
					/>
				</div>
			</div>
			<Transition appear show={isOpen} as={Fragment}>
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
								<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-darkpurple border border-white p-6 text-left align-middle shadow-xl transition-all'>
									<div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
										<div className='w-full max-w-md space-y-8'>
											<div>
												<img
													className='mx-auto h-12 w-auto'
													src='/images/Logo/logo.svg'
													alt='Evolution Server Logo'
												/>
												<h2 className='mt-6 text-center text-xl tracking-tight text-white'>
													Send message to all rooms
												</h2>
											</div>
											<form
												className='mt-8 space-y-6'
												onSubmit={handleSendMessage}
											>
												<div className='-space-y-px rounded-md shadow-sm'>
													<div>
														<label
															htmlFor='send-message'
															className='sr-only'
														>
															Message
														</label>
														<textarea
															id='send-message'
															name='message'
															value={message}
															onChange={(e) => setMessage(e.target.value)}
															required
															className='relative block w-full appearance-none rounded-none border border-grey500 px-2 py-2 mb-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
															placeholder='Message'
														/>
													</div>
													<div>
														<label
															htmlFor='send-reason'
															className='sr-only'
														>
															Reason
														</label>
														<input
															id='send-reason'
															name='reason'
															type='text'
															value={reason}
															onChange={(e) =>
																setReason(e.target.value)
															}
															autoComplete='signup-email'
															required
															className='relative block w-full appearance-none rounded-none border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
															placeholder='Reason'
														/>
													</div>
												</div>
												<div>
													<button
														type='submit'
														className='group relative flex w-full justify-center rounded-md border border-transparent bg-purple py-2 px-4 text-sm font-medium text-white hover:bg-buttonblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
													>
														Send
													</button>
												</div>
												<p className={error ? 'text-red' : 'text-green'}>
													{requestMessage}
												</p>
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

export default SendMessage;
