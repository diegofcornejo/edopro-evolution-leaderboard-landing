import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/context/auth/AuthContext';

interface NavigationItem {
	name: string;
	href: string;
	current: boolean;
	target?: string;
	show?: boolean;
	permission?: string[];
}

const navigation: NavigationItem[] = [
	{ name: 'Home', href: '/#home-section', current: false, show: true, permission: ['ANY'] },
	// { name: 'Top', href: '#topplayers-section', current: false },
	{ name: 'Ranking', href: '/#topplayers-section', current: false, show: false, permission: ['ANY'] },
	{ name: 'Features', href: '/#features-section', current: false, show: false, permission: ['ANY'] },
	{ name: 'Download', href: '/#download-section', current: false, show: false, permission: ['ANY'] },
	{ name: 'Tournaments', href: '/tournaments', current: false, show: false, permission: ['ANY'] },
	{ name: 'Banlists', href: '/banlists', current: false, show: false, permission: ['ADMIN'] },
	{
		name: 'Status',
		href: 'https://status.evolutionygo.com',
		current: false,
		target: '_blank',
		show: false,
		permission: ['ANY']
	}
	// {
	// 	name: 'Github',
	// 	href: 'https://github.com/diangogav/EDOpro-server-ts',
	// 	current: false,
	// 	target: '_blank',
	// }
];

// get menu items based on user permissions
const getNavigation = (user) => {
	const permissions = user?.role;
	const nav = navigation.map((item) => {
		if (item.permission.includes('ANY')) {
			item.show = true;
		} else if (item.permission.includes(permissions)) {
			item.show = true;
		}
		return item;
	});
	return nav;
}

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
