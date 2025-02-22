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
	};
	const menuflexValue = isMenuOpened ? '1' : '2';
	const sliderValue = isMenuOpened ? 'rotate-0' : 'rotate-180';
	return (
		<aside
			name="side-menu-wrapper"
			className={`2xl:flex lg:hidden hidden flex-col flex-${menuflexValue} transition-all duration-250 ease-in-out items-center content-between justify-between
			rounded-3xl px-2 mr-4 bg-amber-700`}
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
			<div className="2xl:flex xl:hidden hidden flex-col gap-6">
				<WelcomeTopMenu />
				<DayNightSwitcher sliderValue={sliderValue} onButtonClick={onButtonClick} />
			</div>
		</aside>
	);
};
