import React, { useState } from 'react';

import { MenuButtonsContainer } from './MenuButtonsContainer';
import { WelcomeTopMenu } from './WelcomeTopMenu';
import { DayNightSwitcher } from './DayNightSwitcher';
import SlideRight from '../../assets/icons/slider-right-icon.svg';

import { MenuSliderButton } from '../buttons';

export const SidebarMenu = () => {
	const [isMenuOpened, setIsMenuOpened] = useState(false);

	const onButtonClick = () => {
		setIsMenuOpened(!isMenuOpened);
	};
	const menuflexValue = isMenuOpened ? '1' : '2';

	return (
		<aside
			name="side-menu-wrapper"
			className={`2xl:flex lg:hidden hidden flex-col flex-${menuflexValue} transition-all duration-250 ease-in-out items-center content-between justify-between
			rounded-3xl px-2 mr-4`}
		>
			<div className="flex flex-1 justify-center items-center transition-all duration-250">
				<MenuSliderButton
					padding={'px-3'}
					width={'w-11'}
					value={isMenuOpened}
					onClick={onButtonClick}
					alt="slide"
					icon={SlideRight}
				/>
			</div>
			<MenuButtonsContainer isMenuOpened={isMenuOpened} />
			<div className="2xl:flex xl:hidden hidden flex-col gap-6">
				<WelcomeTopMenu />
				<DayNightSwitcher onButtonClick={onButtonClick} />
			</div>
		</aside>
	);
};
