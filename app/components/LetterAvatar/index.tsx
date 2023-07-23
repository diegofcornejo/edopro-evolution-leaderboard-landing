'use client';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


const LetterAvatar = ({name, size, borderColor='#291545'}) => {
	const letters = name.slice(0, 2).toUpperCase();
	return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: '#291545', width: size, height: size, borderColor, borderWidth: '1px'}}>{letters}</Avatar>
    </Stack>
  );
};

export default LetterAvatar;
