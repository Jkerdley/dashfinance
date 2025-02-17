import React from 'react';
import { MenuButton } from './MenuButton';

export const WideMenuButton = ({ alt, icon, buttonText, disabled, onClick, to }) => {
	const isDisabled = disabled ? 'text-gray-300' : 'text-white';
	return (
		<MenuButton
			width={'w-52'}
			to={to}
			alt={alt}
			icon={icon}
			disabled={disabled}
			onClick={onClick}
			padding={'px-4'}
		>
			<span className={`font-medium text-base ${isDisabled}`}>{buttonText}</span>
		</MenuButton>
	);
};
