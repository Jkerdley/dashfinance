import React from 'react';
import { MenuButton } from '../buttons/MenuButton';
import { MENU_CONFIG } from '../../config/menu-config';

export const MenuButtonsContainer = ({ isMenuOpened }) => {
	return (
		<nav className="flex items-start justify-center w-full py-10 flex-6">
			<div className="flex flex-col items-start justify-around gap-8">
				{MENU_CONFIG.map((item) => (
					<MenuButton
						key={item.id}
						to={item.to}
						alt={item.id}
						icon={item.icon}
						disabled={item.disabled}
						width={isMenuOpened ? 'w-48' : 'w-11'}
						isWide={isMenuOpened}
						buttonText={isMenuOpened ? item.text : undefined}
					/>
				))}
			</div>
		</nav>
	);
};
