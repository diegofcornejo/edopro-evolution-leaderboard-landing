import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Box, Menu, Button, IconButton, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import LetterAvatar from '../LetterAvatar';
import UserAvatar from '../Avatar';

import {
	IconMedal,
	IconUserCircle,
	IconHexagon,
	IconShieldLock,
	IconUserStar,
	IconListDetails,
} from '@tabler/icons-react';

import ChangePassword from './ChangePassword';
import CustomAvatar from '../AvatarGenerator';

const handleOpenHistory = async () => {
	const token = localStorage.getItem('token');
	const res = await fetch('/api/user/duels', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	if (res.ok) {
		const duels = await res.json();
		toast.custom(
			(t) => (
				<>
					<div className='mx-auto max-w-7xl px-6' id='ranking-section'>
						<div className='relative table-b bg-navyblue p-8 overflow-x-auto'>
							<h3 className='text-offwhite text-2xl'>Duels ({duels.length})</h3>
							<h3
								className='absolute top-4 right-4 text-offwhite text-2xl cursor-pointer'
								onClick={() => toast.dismiss(t.id)}
							>
								x
							</h3>
							<table className='table-auto w-full mt-10'>
								<thead>
									<tr className='text-white bg-darkblue rounded-lg'>
										<th className='px-4 py-4 font-normal'>DUEL MODE</th>
										<th className='px-4 py-4 font-normal'>TYPE</th>
										<th className='px-4 py-4 text-start font-normal'>
											Player 1
										</th>
										<th className='px-4 py-4 text-start font-normal'>vs</th>
										<th className='px-4 py-4 text-start font-normal'>
											Player 2
										</th>
										<th className='px-4 py-4 text-start font-normal'>Turns</th>
										<th className='px-4 py-4 text-start font-normal'>Result</th>
									</tr>
								</thead>
								<tbody>
									{duels.map((duel, i) => (
										<tr key={i} className='border-b border-b-darkblue'>
											<td className='px-4 py-2 text-center text-white'>
												{duel.players[0].name.split(',').length} v{' '}
												{duel.players[1].name.split(',').length} | Best Of{' '}
												{duel.bestOf}
											</td>
											<td className='px-4 py-2 text-white'>
												{duel.type}
											</td>
											<td className='px-4 py-2 text-white'>
												{/* <LetterAvatar
													name={duel.players[0].name}
													size={40}
													fontSize={`1rem`}
												/> */}
												{duel.players[0].name}
											</td>
											<td className='px-4 py-2 text-white'></td>
											<td className='px-4 py-2 text-white'>
												{duel.players[1].name}
											</td>
											<td className='px-4 py-2 text-white'>{duel.turns}</td>
											<td
												className={`px-4 py-2 ${
													duel.players[0].winner
														? 'text-green'
														: 'text-red'
												}`}
											>
												{duel.players[0].score} - {duel.players[1].score}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</>
			),
			{
				duration: Infinity,
			}
		);
	} else {
		toast.error('Error while fetching user history');
	}
};

const Profile = ({ setIsLogged, user }) => {
	const handleLogout = () => {
		setIsLogged(false);
		localStorage.removeItem('token');
	};
	const [anchorEl2, setAnchorEl2] = useState(null);
	const handleClick2 = (event: any) => {
		setAnchorEl2(event.currentTarget);
	};
	const handleClose2 = () => {
		setAnchorEl2(null);
	};

	const [isOpenPasswordChange, setIsOpenPasswordChange] = useState(false);
	const handleOpenPasswordChange = () => {
		setIsOpenPasswordChange(true);
		setAnchorEl2(null);
	};

	const [isOpenCustomAvatar, setIsOpenCustomAvatar] = useState(false);
	const handleOpenCustomAvatar = () => {
		setIsOpenCustomAvatar(true);
		setAnchorEl2(null);
	};

	const AvatarComponent = user?.avatar ? (
		<UserAvatar size={'48px'} avatarParts={user.avatar} />
	) : (
		<LetterAvatar name={user.username} size={48} borderColor='#ffffff' />
	);

	const menuItems = [
		{
			text: user.username,
			icon: IconUserCircle,
		},
		{
			text: `Rank # ${user.rank + 1}`,
			icon: IconMedal,
		},
		{
			text: `Points: ${user.points}`,
			icon: IconHexagon,
		},
		{
			text: `Wins: ${user.wins}`,
			icon: IconHexagon,
		},
		{
			text: `Losses: ${user.losses}`,
			icon: IconHexagon,
		},
		{
			text: `Winrate: ${user.winrate}%`,
			icon: IconHexagon,
		},
		{
			text: 'Avatar',
			icon: IconUserStar,
			onClick: handleOpenCustomAvatar,
		},
		{
			text: 'Duel Log',
			icon: IconListDetails,
			onClick: handleOpenHistory,
		},
		{
			text: 'Change Password',
			icon: IconShieldLock,
			onClick: handleOpenPasswordChange,
		},
	];

	return (
		<Box>
			<IconButton
				size='large'
				aria-label='Open profile'
				color='inherit'
				aria-controls='msgs-menu'
				aria-haspopup='true'
				sx={{
					...(typeof anchorEl2 === 'object' && {
						color: 'primary.main',
					}),
				}}
				onClick={handleClick2}
			>
				{AvatarComponent}
			</IconButton>
			{/* ------------------------------------------- */}
			{/* Message Dropdown */}
			{/* ------------------------------------------- */}
			<Menu
				id='msgs-menu'
				anchorEl={anchorEl2}
				keepMounted
				open={Boolean(anchorEl2)}
				onClose={handleClose2}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				sx={{
					'& .MuiMenu-paper': {
						width: '200px',
						bgcolor: '#291545',
						color: '#ffffff',
					},
				}}
			>
				{menuItems.map((item, index) => (
					<MenuItem key={index} disableRipple onClick={item.onClick}>
						<ListItemIcon>
							{React.createElement(item.icon, { width: 20, color: '#ffffff' })}
						</ListItemIcon>
						<ListItemText> {item.text}</ListItemText>
					</MenuItem>
				))}
				<Box mt={1} py={1} px={2}>
					<Button
						href='/'
						variant='outlined'
						color='info'
						component={Link}
						onClick={() => handleLogout()}
						fullWidth
					>
						Logout
					</Button>
				</Box>
			</Menu>
			{isOpenPasswordChange && (
				<ChangePassword
					isOpenPasswordChange={isOpenPasswordChange}
					setIsOpenPasswordChange={setIsOpenPasswordChange}
					setIsLogged={setIsLogged}
				/>
			)}
			{isOpenCustomAvatar && (
				<CustomAvatar
					isOpenCustomAvatar={isOpenCustomAvatar}
					setIsOpenCustomAvatar={setIsOpenCustomAvatar}
					avatar={user.avatar}
				/>
			)}
		</Box>
	);
};

export default Profile;
