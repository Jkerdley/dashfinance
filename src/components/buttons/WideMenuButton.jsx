import React from 'react';
import { MenuButton } from './MenuButton';

export const WideMenuButton = ({ alt, icon, buttonText, disabled, onClick }) => {
	const isDisabled = disabled ? 'text-gray-300' : 'hover:scale-105 transition-all ease';
	return (
		<div className="flex items-center justify-center gap-2">
			<MenuButton alt={alt} icon={icon} disabled={disabled} onClick={onClick} />
			<a href="/" className={`font-medium text-base ${isDisabled}`}>
				{buttonText}
			</a>
		</div>
	);
};
