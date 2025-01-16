import React, { useState } from 'react';

import { Menu } from './Menu';
import { WelcomeTopMenu } from './WelcomeTopMenu';
import { DayNightSwitcher } from './DayNightSwitcher';
import SlideRight from '../../assets/icons/slider-right-icon.svg';
import { MenuButton } from '../buttons/MenuButton';

export const SidebarMenu = () => {
	const [isMenuOpened, setIsMenuOpened] = useState(false);
	const onButtonClick = () => {
		setIsMenuOpened(!isMenuOpened);
		console.log(isMenuOpened);
	};
	const menuflexValue = isMenuOpened ? '1' : '2';
	const sliderValue = isMenuOpened ? 'rotate-0' : 'rotate-180';
	return (
		<aside
			name="side-menu-wrapper"
			className={`flex transition-all duration-150 ease-in-out 0.2s flex-[${menuflexValue}] flex-col items-center content-between justify-between
			rounded-3xl py-4 px-4 mr-4`}
		>
			<div className="flex flex-[1] justify-center items-center">
				<MenuButton
					wide={11}
					value={sliderValue}
					onClick={onButtonClick}
					alt="slide to right"
					icon={SlideRight}
				/>
			</div>
			<Menu isMenuOpened={isMenuOpened} />
			<WelcomeTopMenu />
			<DayNightSwitcher sliderValue={sliderValue} onButtonClick={onButtonClick} />
		</aside>
	);
};
