import React from 'react';
import PropTypes from 'prop-types';

import DayTheme from '../../assets/icons/day-icon.svg';
import NightTheme from '../../assets/icons/night-icon.svg';
import { Button } from '../buttons/Button';

export const DayNightSwitcher = ({ isInModal }) => {
	return (
		<div id="theme-switcher__container" className={`flex flex-2 flex-col items-center justify-end`}>
			<div
				id="theme-switcher__buttons"
				className={`flex justify-center items-center p-1.5 bg-gray-500/25 rounded-2xl gap-2`}
			>
				<Button alt="DayTheme" icon={DayTheme} />
				<Button alt="NightTheme" icon={NightTheme} />
			</div>
		</div>
	);
};

DayNightSwitcher.propTypes = {
	isInModal: PropTypes.bool,
};
