import React from 'react';
import { MenuButton } from './MenuButton';
import { Link } from 'react-router-dom';

export const WideMenuButton = ({ alt, icon, buttonText, disabled, onClick, to }) => {
	const isDisabled = disabled ? 'text-gray-300' : 'text-white';
	return (
		<MenuButton wide={48} to={to} alt={alt} icon={icon} disabled={disabled} onClick={onClick}>
			<Link to={to} className={`font-medium text-base ${isDisabled}`}>
				{buttonText}
			</Link>
		</MenuButton>
	);
};
