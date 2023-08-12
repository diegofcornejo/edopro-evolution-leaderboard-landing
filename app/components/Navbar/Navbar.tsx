import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import Drawer from './Drawer';
import Drawerdata from './Drawerdata';
import Signdialog from './Signdialog';
import Registerdialog from './Registerdialog';
import Profile from './Profile';
// import Contactusform from './Contactus';

interface NavigationItem {
	name: string;
	href: string;
	current: boolean;
	target?: string;
}

const navigation: NavigationItem[] = [
	{ name: 'Home', href: '#home-section', current: false },
	// { name: 'Top', href: '#topplayers-section', current: false },
	{ name: 'Ranking', href: '#topplayers-section', current: false },
	{ name: 'Features', href: '#features-section', current: false },
	{ name: 'Download', href: '#download-section', current: false },
	{ name: 'Tournaments', href: '/tournaments', current: false },
	{
		name: 'Github',
		href: 'https://github.com/diangogav/EDOpro-server-ts',
		current: false,
		target: '_blank',
	},
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

const errorFetchingUserData = () => {
	toast.error(`Error while fetching user data,
		Please login again`);
	localStorage.removeItem('session');
};

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isLogged, setIsLogged] = useState(false);
	const [user, setUser] = useState(null);

	if (typeof window !== 'undefined') {
		const session = localStorage.getItem('session');
		const token = session ? JSON.parse(session).token : '';
		if (token && !user) {
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/rank`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.username) {
						setUser(data);
						setIsLogged(true);
					} else {
						errorFetchingUserData();
					}
				})
				.catch((err) => {
					errorFetchingUserData();
				});
		}
	}

	return (
		<Disclosure as='nav' className='navbar'>
			<>
				<div className='mx-auto max-w-7xl p-3 md:p-4 lg:px-8'>
					<div className='relative flex h-12 sm:h-20 items-center'>
						<div className='flex flex-1 items-center justify-between'>
							{/* LOGO */}

							<div className='flex flex-shrink-0 items-center'>
								<img
									className='block h-10 w-20px lg:hidden'
									src={'/images/Logo/logo.svg'}
									alt='Evolution-Logo'
								/>
								<img
									className='hidden h-48px w-48px lg:block'
									src={'/images/Logo/logo.svg'}
									alt='Evolution-Logo'
								/>
							</div>

							{/* LINKS */}

							<div className='hidden lg:flex items-center border-right '>
								<div className='flex justify-end space-x-4'>
									{navigation.map((item) => (
										<Link
											key={item.name}
											href={item.href}
											className={classNames(
												item.current
													? 'bg-gray-900'
													: 'navlinks text-white hover:text-offwhite hover-underline',
												'px-3 py-4 rounded-md text-lg font-normal'
											)}
											aria-current={item.href ? 'page' : undefined}
											target={item.target}
										>
											{item.name}
										</Link>
									))}
								</div>
							</div>
							{/* <button className='hidden lg:flex justify-end text-xl font-semibold py-4 px-6 lg:px-12 navbutton text-white'>
								Login
							</button> */}
							{!isLogged && (
								<>
									<Registerdialog />
									<Signdialog setIsLogged={setIsLogged} setUser={setUser} />
								</>
							)}
							{isLogged && <Profile setIsLogged={setIsLogged} user={user} />}
							{/* <Contactusform /> */}
						</div>

						{/* DRAWER FOR MOBILE VIEW */}

						{/* DRAWER ICON */}

						<div className='block lg:hidden ml-4'>
							<Bars3Icon
								className='block h-6 w-6 text-white'
								aria-hidden='true'
								onClick={() => setIsOpen(true)}
							/>
						</div>

						{/* DRAWER LINKS DATA */}

						<Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
							<Drawerdata />
						</Drawer>
					</div>
				</div>
			</>
		</Disclosure>
	);
};

export default Navbar;
