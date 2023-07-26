import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
	Box,
	Menu,
	Button,
	IconButton,
	MenuItem,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import LetterAvatar from '../LetterAvatar';
import UserAvatar from '../Avatar';

import { IconMedal, IconUserCircle, IconHexagon, IconShieldLock, IconUserStar } from '@tabler/icons-react';

import ChangePassword from './ChangePassword';
import CustomAvatar from '../AvatarGenerator';
import { type } from 'os';

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
		const data = await res.json();
		toast.success(JSON.stringify(data));
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
				<MenuItem disableRipple>
					<ListItemIcon>
						<IconUserCircle width={20} color='#ffffff' />
					</ListItemIcon>
					<ListItemText>{user.username}</ListItemText>
				</MenuItem>
				<MenuItem disableRipple>
					<ListItemIcon>
						<IconMedal width={20} color='#ffffff' />
					</ListItemIcon>
					<ListItemText>Rank # {user.rank + 1}</ListItemText>
				</MenuItem>
				<MenuItem disableRipple>
					<ListItemIcon>
						<IconHexagon width={20} color='#ffffff' />
					</ListItemIcon>
					<ListItemText>Points: {user.points}</ListItemText>
				</MenuItem>
				<MenuItem disableRipple>
					<ListItemIcon>
						<IconHexagon width={20} color='#ffffff' />
					</ListItemIcon>
					<ListItemText>Wins: {user.wins}</ListItemText>
				</MenuItem>
				<MenuItem disableRipple>
					<ListItemIcon>
						<IconHexagon width={20} color='#ffffff' />
					</ListItemIcon>
					<ListItemText>Losses: {user.losses}</ListItemText>
				</MenuItem>
				<MenuItem disableRipple>
					<ListItemIcon>
						<IconHexagon width={20} color='#ffffff' />
					</ListItemIcon>
					<ListItemText>Winrate: {user.winrate}%</ListItemText>
				</MenuItem>
				{/* <MenuItem onClick={handleOpenHistory} disableRipple>
					<ListItemIcon>
						<IconList width={20} color='#ffffff'/>
					</ListItemIcon>
					<ListItemText>Duel Logs</ListItemText>
				</MenuItem> */}
				<MenuItem onClick={handleOpenPasswordChange}>
					<ListItemIcon>
						<IconShieldLock width={20} color='#ffffff' />
					</ListItemIcon>
					<ListItemText>Change Password</ListItemText>
				</MenuItem>
				<MenuItem onClick={handleOpenCustomAvatar}>
					<ListItemIcon>
						<IconUserStar width={20} color='#ffffff' />
					</ListItemIcon>
					<ListItemText>Avatar</ListItemText>
				</MenuItem>
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
				/>
			)}
		</Box>
	);
};

export default Profile;
