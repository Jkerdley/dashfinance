import React from 'react';
import DayTheme from '../../assets/icons/day-icon.svg';
import NightTheme from '../../assets/icons/night-icon.svg';
import { Button } from '../buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/actions';

export const DayNightSwitcher = () => {
	const dispatch = useDispatch();
	const isDayTheme = useSelector((state) => state.theme.isDayTheme);

	const handleToggleTheme = () => {
		dispatch(toggleTheme());
	};

	return (
		<div id="theme-switcher__container" className={`flex flex-2 flex-col items-center justify-end`}>
			<div
				id="theme-switcher__buttons"
				className={`flex justify-center items-center p-1.5 bg-gray-500/25 rounded-2xl gap-2`}
			>
				<Button alt="DayTheme" icon={DayTheme} onClick={handleToggleTheme} disabled={isDayTheme} />
				<Button
					alt="NightTheme"
					icon={NightTheme}
					onClick={handleToggleTheme}
					disabled={!isDayTheme}
				/>
			</div>
		</div>
	);
};
