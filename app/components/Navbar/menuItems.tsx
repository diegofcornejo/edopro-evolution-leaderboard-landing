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
	{ name: 'Banlists', href: '/banlists', current: false, show: false, permission: ['MANAGER','ADMIN'] },
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
		if (item.permission?.includes('ANY')) {
			item.show = true;
		} else if (item.permission?.includes(permissions)) {
			item.show = true;
		}
		return item;
	});
	return nav;
}

export { getNavigation };