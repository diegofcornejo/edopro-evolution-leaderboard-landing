import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState} from 'react';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import toast from 'react-hot-toast';

const ChangePassword = ({ isOpenPasswordChange, setIsOpenPasswordChange, setIsLogged }) => {
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [message, setMessage] = useState(`New password can't be more than 4 characters`);
	const [error, setError] = useState(false);

	const closeModal = () => {
		setIsOpenPasswordChange(false);
	};

	const handleChangePassword = async (e) => {
		e.preventDefault();
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ password, newPassword }),
		});
		const res = await response.json();
		if (response.ok) {
			closeModal();
			localStorage.removeItem('session');
			setIsLogged(false);
			toast.success('Password changed successfully, Please login again', { duration: 5000 });
		} else {
			setError(true);
			setMessage(res.error);
		}
	};

	return (
		<>
			<Transition appear show={isOpenPasswordChange} as={Fragment}>
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
													alt='Your Company'
												/>
												<h2 className='mt-6 text-center text-xl tracking-tight text-white'>
													Change Password
												</h2>
											</div>
											<form
												className='mt-8 space-y-6'
												onSubmit={handleChangePassword}
											>
												<div className='-space-y-px rounded-md shadow-sm'>
													<div>
														<label
															htmlFor='change-password'
															className='sr-only'
														>
															Actual Password
														</label>
														<input
															id='change-password'
															name='change-password'
															type='password'
															defaultValue={password}
															onChange={(e) =>
																setPassword(e.target.value)
															}
															pattern='[^:]*'
															title="Password cannot contain the ':' character"
															autoComplete='change-password'
															required
															className='relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
															placeholder='Actual Password'
														/>
													</div>
													<div>
														<label
															htmlFor='change-new-password'
															className='sr-only'
														>
															New Password
														</label>
														<input
															id='change-new-password'
															name='change-new-password'
															type='password'
															defaultValue={newPassword}
															onChange={(e) => {
																if (e.target.value.length <= 4) {
																	setNewPassword(e.target.value);
																}
															}}
															pattern='[^:]*'
															title="Password cannot contain the ':' character"
															autoComplete='change-new-password'
															required
															maxLength={4}
															className='relative block w-full appearance-none rounded-none rounded-b-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
															placeholder='New Password'
														/>
													</div>
												</div>
												<div>
													<button
														type='submit'
														className='group relative flex w-full justify-center rounded-md border border-transparent bg-purple py-2 px-4 text-sm font-medium text-white hover:bg-buttonblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
													>
														<span className='absolute inset-y-0 left-0 flex items-center pl-3'>
															<LockClosedIcon
																className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
																aria-hidden='true'
															/>
														</span>
														Change Now
													</button>
												</div>
												<p className={error ? 'text-red' : 'text-green'}>
													{message}
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
											Got it, thanks!
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

export default ChangePassword;
