'use client';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


const LetterAvatar = ({name}) => {
	const letters = name.slice(0, 2).toUpperCase();
	return (
    <Stack direction="row" spacing={2}>
      <Avatar className='text-darkpurple'>{letters}</Avatar>
    </Stack>
  );
};

export default LetterAvatar;
