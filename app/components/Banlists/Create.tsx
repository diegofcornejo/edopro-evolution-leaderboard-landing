import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import toast from 'react-hot-toast';
// import { camelCaseToWords } from '../../../libs/helpers';
import options from './options';

const CreateTournament = ({ isCreateOpen, setIsCreateOpen, tournaments }) => {
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

	const handleCreateTournament = async (e) => {
		e.preventDefault();
		const session = localStorage.getItem('session');
		const token = session ? JSON.parse(session).token : '';
		
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tournament`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(tournamentOptions),
		});
		const res = await response.json();
		if (response.ok) {
			toast.success(res.message, { duration: 5000 });
			tournamentOptions.id = res.tournamentId;
			tournaments.push(tournamentOptions);
		} else {
			toast.error(res.error, { duration: 5000 });
		}
		closeModal();
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
												<div className='space-y-2 rounded-md shadow-sm'>
													<div>
														<label
															htmlFor='tournament-name'
															className='text-white'
														>
															Name
														</label>
														<input
															id='tournament-name'
															name='tournament-name'
															type='text'
															value={tournamentOptions.name}
															onChange={(e) => {
																if (e.target.value.length <= 40) {
																	handleChange(
																		'name',
																		e.target.value
																	);
																}
															}}
															required
															maxLength={40}
															className='relative block w-full appearance-none rounded-none border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-buttonblue focus:outline-none focus:ring-buttonblue sm:text-sm'
															placeholder='Name'
														/>
													</div>
													<div>
														<label
															htmlFor='tournament-type'
															className='text-white'
														>
															Tournament Type
														</label>
														<select
															id='tournament-type'
															name='tournament-type'
															value={tournamentOptions.type}
															onChange={(e) =>
																handleChange('type', e.target.value)
															}
															required
															className='relative block w-full appearance-none rounded-none border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-buttonblue focus:outline-none focus:ring-buttonblue sm:text-sm'
														>
															<option value='' disabled>
																Select Tournament Type
															</option>
															{options.type.map((type) => (
																<option key={type.value} value={type.value}>
																	{type.label}
																</option>
															))}
														</select>
													</div>
													<div>
														<label
															htmlFor='tournament-mode'
															className='text-white'
														>
															Duel Mode
														</label>
														<select
															id='tournament-mode'
															name='tournament-mode'
															value={tournamentOptions.mode}
															onChange={(e) =>
																handleChange('mode', e.target.value)
															}
															required
															className='relative block w-full appearance-none rounded-none border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-buttonblue focus:outline-none focus:ring-buttonblue sm:text-sm'
														>
															<option value='' disabled>
																Select Duel Mode
															</option>
															{options.mode.map((mode) => (
																<option key={mode.value} value={mode.value}>
																	{mode.label}
																</option>
															))}
														</select>
													</div>
													<div>
														<label
															htmlFor='tournament-bestof'
															className='text-white'
														>
															Best of
														</label>
														<select
															id='tournament-bestof'
															name='tournament-bestof'
															value={tournamentOptions.bestOf}
															onChange={(e) =>
																handleChange(
																	'bestOf',
																	e.target.value
																)
															}
															required
															className='relative block w-full appearance-none rounded-none border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-buttonblue focus:outline-none focus:ring-buttonblue sm:text-sm'
														>
															<option value='' disabled>
																Select Best of
															</option>
															{options.bestOf.map((bestOf) => (
																<option
																	key={bestOf.value}
																	value={bestOf.value}
																>
																	{bestOf.label}
																</option>
															))}
														</select>
													</div>
													<div>
														<label
															htmlFor='tournament-banlist'
															className='text-white'
														>
															Banlist
														</label>
														<select
															id='tournament-banlist'
															name='tournament-banlist'
															value={tournamentOptions.banlist}
															onChange={(e) =>
																handleChange(
																	'banlist',
																	e.target.value
																)
															}
															required
															className='relative block w-full appearance-none rounded-none border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-buttonblue focus:outline-none focus:ring-buttonblue sm:text-sm'
														>
															<option value='' disabled>
																Select Banlist
															</option>
															{options.banlist.map((banlist) => (
																<option
																	key={banlist.value}
																	value={banlist.value}
																>
																	{banlist.label}
																</option>
															))}
														</select>
													</div>
													<div>
														<label
															htmlFor='tournament-rule'
															className='text-white'
														>
															Master Rule
														</label>
														<select
															id='tournament-rule'
															name='tournament-rule'
															value={tournamentOptions.rule}
															onChange={(e) =>
																handleChange('rule', e.target.value)
															}
															required
															className='relative block w-full appearance-none rounded-none border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-buttonblue focus:outline-none focus:ring-buttonblue sm:text-sm'
														>
															<option value='' disabled>
																Select Rule
															</option>
															{options.rule.map((rule) => (
																<option key={rule.value} value={rule.value}>
																	{rule.label}
																</option>
															))}
														</select>
													</div>
													<div>
														<label
															htmlFor='tournament-start'
															className='text-white'
														>
															Start Date
														</label>
														<input
															id='tournament-start'
															name='tournament-start'
															type='date'
															value={tournamentOptions.startDate}
															onChange={(e) =>
																handleChange(
																	'startDate',
																	e.target.value
																)
															}
															required
															className='relative block w-full appearance-none rounded-none border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-buttonblue focus:outline-none focus:ring-buttonblue sm:text-sm'
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

export default CreateTournament;
