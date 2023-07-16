import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/20/solid';

const Register = () => {
	let [isOpen, setIsOpen] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState(false);

	const cleanForm = () => {
		setUsername('');
		setPassword('');
		setEmail('');
		setMessage('');
		setError(false);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const openModal = () => {
		cleanForm();
		setIsOpen(true);
	};

	const handleSignup = async (e) => {
		e.preventDefault();
		setMessage('');
		setError(false);
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password, email }),
		});
		const res = await response.json();
		if (response.ok) {
			setMessage(res.message);
		} else {
			setError(true);
			setMessage(res.error);
		}
	};

	return (
		<>
			<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto  sm:pr-0'>
				<div className='hidden md:block'>
					<button
						className='hidden lg:flex justify-end text-l py-2 px-4 lg:px-4 navbutton text-white'
						onClick={openModal}
					>
						Register
					</button>
				</div>
			</div>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as='div' className='relative z-10' onClose={closeModal}>
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
													Register your account
												</h2>
											</div>
											<form
												className='mt-8 space-y-6'
												onSubmit={handleSignup}
											>
												{/* <input
													type='hidden'
													name='remember'
													defaultValue='true'
												/> */}
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
															value={username}
															onChange={(e) =>
																setUsername(e.target.value)
															}
															pattern="^\S+$" title="Spaces are not allowed"
															autoComplete='signup-username'
															required
															className='relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
															placeholder='Username'
														/>
													</div>
													<div>
														<label
															htmlFor='signup-email'
															className='sr-only'
														>
															Email
														</label>
														<input
															id='signup-email'
															name='email'
															type='email'
															value={email}
															onChange={(e) =>
																setEmail(e.target.value)
															}
															autoComplete='signup-email'
															required
															className='relative block w-full appearance-none rounded-none border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
															placeholder='Email'
														/>
													</div>
													<div>
														<label
															htmlFor='signup-password'
															className='sr-only'
														>
															Password
														</label>
														<input
															id='signup-password'
															name='signup-password'
															type='password'
															value={password}
															onChange={(e) =>
																setPassword(e.target.value)
															}
															pattern="[^:]*" title="Password cannot contain the ':' character"
															autoComplete='signup-password'
															required
															className='relative block w-full appearance-none rounded-none rounded-b-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
															placeholder='Password'
														/>
													</div>
												</div>

												<div className='flex items-center justify-between'>
													{/* <div className='flex items-center'>
														<input
															id='remember-me'
															name='remember-me'
															type='checkbox'
															className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
														/>
														<label
															htmlFor='remember-me'
															className='ml-2 block text-sm text-gray-900'
														>
															Remember me
														</label>
													</div> */}
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
														Register Now
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

export default Register;
