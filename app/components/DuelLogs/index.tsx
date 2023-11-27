import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const formatDate = (date) => {
	const newDate = new Date(date);
	const day = newDate.getDate().toString().padStart(2, '0');
	const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
	const year = newDate.getFullYear();
	const hours = newDate.getHours().toString().padStart(2, '0');
	const minutes = newDate.getMinutes().toString().padStart(2, '0');
	const seconds = newDate.getSeconds().toString().padStart(2, '0');
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
const DuelLogs = ({ isOpenDuelLogs, setIsOpenDuelLogs, duels, banlistname }) => {
	const closeModal = () => {
		setIsOpenDuelLogs(false);
	};

	return (
		<>
			<Transition appear show={isOpenDuelLogs} as={Fragment}>
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
								<Dialog.Panel className='w-full max-w-7xl transform overflow-hidden rounded-2xl bg-navyblue border border-white text-left align-middle shadow-xl transition-all'>
									<div className='flex min-h-full items-center justify-center py-2 px-4 sm:px-6 lg:px-8'>
										<div className='w-full max-w-7xl space-y-8'>
											<div className='relative table-b bg-navyblue p-4 overflow-x-auto' style={{ height: '50rem' }}>
												<h3 className='text-offwhite text-2xl'>
													Duels ({duels.length})
												</h3>
												<table className='table-auto w-full mt-10'>
													<thead>
														<tr className='text-white bg-darkblue rounded-lg'>
															<th className='px-4 py-4 font-normal'>
																DUEL MODE
															</th>
															<th className='px-4 py-4 font-normal'>
																TYPE
															</th>
															<th className='px-4 py-4 text-start font-normal'>
																PLAYER 1
															</th>
															<th className='px-4 py-4 text-start font-normal'>
																vs
															</th>
															<th className='px-4 py-4 text-start font-normal'>
																PLAYER 2
															</th>
															<th className='px-4 py-4 text-center font-normal'>
																RESULT
															</th>
															<th className='px-4 py-4 text-center font-normal'>
																POINTS
															</th>
															<th className='px-4 py-4 font-normal'>
																DATE
															</th>
														</tr>
													</thead>
													<tbody>
														{duels.map((duel, i) => (
															<tr
																key={i}
																className='border-b border-b-darkblue'
															>
																<td className='px-4 py-2 text-white'>
																	{
																		duel.players[0].name.split(
																			','
																		).length
																	}{' '}
																	v{' '}
																	{
																		duel.players[1].name.split(
																			','
																		).length
																	}{' '}
																	| Best Of {duel.bestOf}
																</td>
																<td className='px-4 py-2 text-white'>
																	{duel.type}
																</td>
																<td className='px-4 py-2 text-white'>
																	{duel.players[0].name}
																</td>
																<td className='px-4 py-2 text-white'></td>
																<td className='px-4 py-2 text-white'>
																	{duel.players[1].name}
																</td>
																<td
																	className={`px-4 py-2 text-center ${duel.players[0].winner
																		? 'text-green'
																		: 'text-red'
																		}`}
																>
																	{duel.players[0].score} -{' '}
																	{duel.players[1].score}
																</td>
																<td className='px-4 py-2 text-white text-center'>
																	{duel.players[0].points && duel.players[0].points[banlistname]}
																</td>
																<td className='px-4 py-2 text-white'>
																	{formatDate(duel.date)}
																</td>
															</tr>
														))}
													</tbody>
												</table>
											</div>
										</div>
									</div>
									<div className='mt-4 flex justify-center'>
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

export default DuelLogs;
