import React from 'react';
import { MenuButton } from './MenuButton';
import { Link } from 'react-router-dom';

export const WideMenuButton = ({ alt, icon, buttonText, disabled, onClick, to }) => {
	const isDisabled = disabled ? 'text-gray-300' : 'hover:scale-105 transition-all ease';
	return (
		<div className="flex items-center justify-center gap-3">
			<MenuButton to={to} alt={alt} icon={icon} disabled={disabled} onClick={onClick} />
			<Link to={to} className={`font-medium text-base ${isDisabled}`}>
				{buttonText}
			</Link>
		</div>
	);
};
