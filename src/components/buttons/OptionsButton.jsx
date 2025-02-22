import React from 'react';
import { EditButton } from './EditButton';
import OptionsIcon from '../../assets/icons/options-icon.svg';

export const OptionsButton = ({ to, flex }) => {
	return (
		<div className={`flex ${flex} justify-end shrink-0`}>
			<EditButton to={to} size={5} icon={OptionsIcon}></EditButton>
		</div>
	);
};
