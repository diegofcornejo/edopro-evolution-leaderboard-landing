import React, { useContext, useState } from 'react';
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
import DuelLogs from '../DuelLogs';
import { AuthContext } from '@/context/auth/AuthContext';

// const handleOpenHistory = async () => {

// };

const Profile = ({ setIsLogged, user }) => {
	const { logout } = useContext(AuthContext);

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

	const [duels, setDuels] = useState([]);
	const [isOpenDuelLogs, setIsOpenDuelLogs] = useState(false);
	const handleOpenDuelLogs = async () => {
		const session = localStorage.getItem('session');
		const token = session ? JSON.parse(session).token : '';
		const res = await fetch(`/api/user/duels?banlistname=Global&username=${user.username}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		if (res.ok) {
			const duels = await res.json();
			setDuels(duels);
			setIsOpenDuelLogs(true);
			setAnchorEl2(null);
			// toast.success('Duel logs fetched successfully');
		} else {
			toast.error('Error while fetching duel logs');
		}
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
			onClick: handleOpenDuelLogs,
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
						onClick={() => logout()}
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
			{isOpenDuelLogs && (
				<DuelLogs
					isOpenDuelLogs={isOpenDuelLogs}
					setIsOpenDuelLogs={setIsOpenDuelLogs}
					duels={duels}
					banlistname="Global"
				/>
			)}
		</Box>
	);
};

export default Profile;
