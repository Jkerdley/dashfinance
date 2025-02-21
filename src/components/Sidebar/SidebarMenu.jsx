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
			className={`2xl:flex md:hidden hidden flex-col flex-${menuflexValue} transition-all duration-250 ease-in-out items-center content-between justify-between
			rounded-3xl py-4 px-4 mr-4`}
		>
			<div className="flex flex-[1] justify-center items-center transition-all duration-250">
				<MenuButton
					padding={'px-3'}
					width={'w-11'}
					value={sliderValue}
					onClick={onButtonClick}
					alt="slide"
					icon={SlideRight}
				/>
			</div>
			<Menu isMenuOpened={isMenuOpened} />
			<WelcomeTopMenu />
			<DayNightSwitcher sliderValue={sliderValue} onButtonClick={onButtonClick} />
		</aside>
	);
};
