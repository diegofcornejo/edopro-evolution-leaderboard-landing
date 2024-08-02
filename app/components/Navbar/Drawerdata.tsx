import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/context/auth/AuthContext';
import { getNavigation } from './menuItems';

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

const Data = () => {
	const { user } = useContext(AuthContext);
	const navItems = getNavigation(user);
	return (
		<div className='rounded-md max-w-sm w-full'>
			<div className='flex-1 space-y-4 py-1'>
				<div className='sm:block'>
					<div className='space-y-1 px-5 pt-2 pb-3'>
						{navItems.filter(item => item.show).map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={classNames(
									item.current
										? 'bg-gray-900 text-purple'
										: 'text-black hover:bg-gray-700 hover:text-purple',
									'block  py-2 rounded-md text-base font-medium'
								)}
								aria-current={item.current ? 'page' : undefined}
								target={item.target}
							>
								{item.name}
							</Link>
						))}
						<div className='mt-4'></div>
						{/* <button className='bg-navyblue w-full hover:text-white text-white border border-purple font-medium py-2 px-4 rounded'>
							Register
						</button> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Data;
