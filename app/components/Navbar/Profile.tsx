import React, { useState } from 'react';
import Link from 'next/link';
import {
	Avatar,
	Box,
	Menu,
	Button,
	IconButton,
	MenuItem,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import LetterAvatar from '../LetterAvatar';

import { IconListCheck, IconMail, IconUser, IconMedal, IconUserCircle, IconHexagon } from '@tabler/icons-react';

const handleOpenProfile = () => {
	console.log('Open Profile');
	alert('Show Profile');
};

const Profile = ({setIsLogged, user}) => {

	const [anchorEl2, setAnchorEl2] = useState(null);
	const handleClick2 = (event: any) => {
		setAnchorEl2(event.currentTarget);
	};
	const handleClose2 = () => {
		setAnchorEl2(null);
	};

	return (
		<Box>
			<IconButton
				size='large'
				aria-label='show 11 new notifications'
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
				{/* <Avatar
					src='https://avatars.githubusercontent.com/u/7274655?v=4'
					alt='image'
					sx={{
						width: 35,
						height: 35,
					}}
				/> */}
				<LetterAvatar name={user.username} size={48} />
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
					},
				}}
			>
				<MenuItem disableRipple disabled>
					<ListItemIcon>
						<IconUserCircle width={20} />
					</ListItemIcon>
					<ListItemText>{user.username}</ListItemText>
				</MenuItem>
				<MenuItem disableRipple disabled>
					<ListItemIcon>
						<IconMedal width={20} />
					</ListItemIcon>
					<ListItemText>Rank # {user.rank + 1}</ListItemText>
				</MenuItem>
				<MenuItem disableRipple disabled>
					<ListItemIcon>
						<IconHexagon width={20} />
					</ListItemIcon>
					<ListItemText>Points: {user.points}</ListItemText>
				</MenuItem>
				<MenuItem disableRipple disabled>
					<ListItemIcon>
						<IconHexagon width={20} />
					</ListItemIcon>
					<ListItemText>Wins: {user.wins}</ListItemText>
				</MenuItem>
				<MenuItem disableRipple disabled>
					<ListItemIcon>
						<IconHexagon width={20} />
					</ListItemIcon>
					<ListItemText>Losses: {user.losses}</ListItemText>
				</MenuItem>
				<MenuItem disableRipple disabled>
					<ListItemIcon>
						<IconHexagon width={20} />
					</ListItemIcon>
					<ListItemText>Winrate: {user.winrate}%</ListItemText>
				</MenuItem>
				{/* <MenuItem onClick={handleOpenProfile} disableRipple disabled>
					<ListItemIcon>
						<IconUser width={20} />
					</ListItemIcon>
					<ListItemText>My Profile</ListItemText>
				</MenuItem> */}
				<Box mt={1} py={1} px={2}>
					<Button
						href='/'
						variant='outlined'
						color='info'
						component={Link}
						onClick={() => setIsLogged(false)}
						fullWidth
					>
						Logout
					</Button>
				</Box>
			</Menu>
		</Box>
	);
};

export default Profile;
