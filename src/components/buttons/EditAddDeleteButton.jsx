import React from 'react';
import OutlineButton from './OutlineButton';

export const EditAddDeleteButton = ({ to, alt, title, icon }) => {
	return (
		<OutlineButton to={to} disabled={false} icon={icon} alt={alt}>
			<span className="flex-shrink overflow-hidden text-base truncate">{title}</span>
		</OutlineButton>
	);
};
