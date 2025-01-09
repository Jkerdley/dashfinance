import React, { useState } from 'react';

import { Menu } from './Menu';
import { WelcomeTopMenu } from './WelcomeTopMenu';
import { DayNightSwitcher } from './DayNightSwitcher';

export const SidebarMenu = () => {
	const [isMenuOpened, setIsMenuOpened] = useState(false);
	const onButtonClick = () => {
		setIsMenuOpened(!isMenuOpened);
		console.log(isMenuOpened);
	};
	const menuBasisValue = isMenuOpened ? '1' : '2';
	const sliderValue = isMenuOpened ? 'rotate-0' : 'rotate-180';
	return (
		<aside
			name="side-menu-wrapper"
			className={`flex transition-all duration-150 ease-in-out 0.2s flex-[${menuBasisValue}] flex-col items-center content-between justify-between
			rounded-3xl backdrop-blur-xl bg-gray-200/20 py-4 px-3 mr-4`}
		>
			<WelcomeTopMenu />
			<Menu isMenuOpened={isMenuOpened} />
			<DayNightSwitcher sliderValue={sliderValue} onButtonClick={onButtonClick} />
		</aside>
	);
};
