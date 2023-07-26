'use client';
import Avatar from 'avataaars';

const UserAvatar = ({ size, avatarParts, className='' }) => {
	return (
		<Avatar
			style={{ width: size, height: size }}
			avatarStyle='Circle'
			{...avatarParts}
			className={className}
		/>
	);
};

export default UserAvatar;
