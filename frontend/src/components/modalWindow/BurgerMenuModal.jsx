// src/components/modalWindow/BurgerMenuModal.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { BaseModal } from './base/BaseModal';
import { MenuButtonsContainer } from '../Sidebar/MenuButtonsContainer';
import { WelcomeTopMenu } from '../Sidebar/WelcomeTopMenu';
import { DayNightSwitcher } from '../Sidebar/DayNightSwitcher';

export const BurgerMenuModal = ({ isOpen, onClose }) => {
	return (
		<BaseModal isOpen={isOpen} onClose={onClose} width="w-[300px]" height="h-full" position="left">
			<div className="flex flex-col h-full justify-between py-8">
				<MenuButtonsContainer isMenuOpened={true} />
				<div className="flex flex-col gap-6">
					<WelcomeTopMenu />
					<DayNightSwitcher />
				</div>
			</div>
		</BaseModal>
	);
};

BurgerMenuModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};
