import React from 'react';
import SlideRight from '../../assets/icons/slider-right-icon.svg';
import DayTheme from '../../assets/icons/day-icon.svg';
import NightTheme from '../../assets/icons/night-icon.svg';
import { Button } from '../buttons/Button';

export const DayNightSwitcher = ({ sliderValue, onButtonClick }) => {
	return (
		<div
			name="menu-bottom-buttons"
			className="flex flex-[1] w-full flex-col items-center justify-end gap-6"
		>
			<Button value={sliderValue} onClick={onButtonClick} alt="slide to right" icon={SlideRight} />
			<div
				name="daytime"
				className={`flex justify-center items-center p-1 bg-slate-400 rounded-xl gap-2`}
			>
				<Button alt="DayTheme" icon={DayTheme} />
				<Button alt="NightTheme" icon={NightTheme} />
			</div>
		</div>
	);
};
