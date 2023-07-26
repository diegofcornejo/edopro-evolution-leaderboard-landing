'use client';
import Avatar from 'avataaars';

const UserAvatar = ({ size, avatarParts }) => {
	return (
		<Avatar
			style={{ width: size, height: size }}
			avatarStyle='Circle'
			className='mx-auto w-auto'
			{...avatarParts}
		/>
	);
};

export default UserAvatar;
