import React from 'react';

import DayTheme from '../../assets/icons/day-icon.svg';
import NightTheme from '../../assets/icons/night-icon.svg';
import { Button } from '../buttons/Button';

export const DayNightSwitcher = () => {
	return (
		<div
			id="theme-switcher__container"
			className="2xl:flex md:flex sm:hidden hidden flex-1 w-full flex-col items-center justify-end gap-6"
		>
			<div
				id="theme-switcher__buttons"
				className={`2xl:flex md:flex xl:flex-row  md:flex-col flex-col justify-center items-center p-1.5 bg-slate-500/30 rounded-2xl gap-2`}
			>
				<Button alt="DayTheme" icon={DayTheme} />
				<Button alt="NightTheme" icon={NightTheme} />
			</div>
		</div>
	);
};
