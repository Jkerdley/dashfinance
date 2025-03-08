import React from 'react';
import OutlineButton from './OutlineButton';

export const EditAddDeleteButton = ({ onClick, alt, title, icon }) => {
	return (
		<OutlineButton onClick={onClick} disabled={false} icon={icon} alt={alt}>
			<span className="flex-shrink overflow-hidden text-base truncate">{title}</span>
		</OutlineButton>
	);
};
