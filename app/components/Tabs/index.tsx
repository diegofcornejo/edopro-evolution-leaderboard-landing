'use client';

// import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import Table from '../Table';
import Top from '../Top';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Tabs({ rankings }) {
	return (
		<div id='topplayers-section'>
			<div className='relative mx-auto max-w-7xl px-6 pt-28'>
				<div className='text-center mb-14'>
					<h3 className='text-offwhite text-3xl md:text-5xl font-bold mb-3'>
						Top Players
					</h3>
					<p className='text-bluish md:text-lg font-normal leading-8'>
						Explore the top players in our community. Discover who the standout
						competitors are in our tournaments and events.
						<br /> Get to know their achievements, strategies, and stay updated with the
						rankings.
					</p>
				</div>
				<Tab.Group>
					<Tab.List className='flex space-x-1 rounded-xl bg-buttonblue/20 p-1'>
						{rankings.map((ranking) => (
							<Tab
								key={ranking.name}
								className={({ selected }) =>
									classNames(
										'w-full rounded-lg py-2.5 text-sm font-medium text-white',
										selected
											? 'bg-white/[0.24] shadow'
											: 'bg-white/[0.03] hover:bg-white/[0.12]'
									)
								}
							>
								{ranking.name}
							</Tab>
						))}
					</Tab.List>
					<Tab.Panels className=''>
						{rankings.map((ranking) => (
							<Tab.Panel key={ranking.name} className={classNames('')}>
								<Top leaderboard={ranking.data} />
								<Table ranking={ranking.data} title={ranking.title} banlistname={ranking.banlistname} className="mx-auto max-w-7xl" />
							</Tab.Panel>
						))}
					</Tab.Panels>
				</Tab.Group>
			</div>
		</div>
	);
}
