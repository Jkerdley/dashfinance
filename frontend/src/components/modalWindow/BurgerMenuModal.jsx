import React from 'react';
import PropTypes from 'prop-types';
import { BaseModal } from './base/BaseModal';
import { MenuButtonsContainer } from '../Sidebar/MenuButtonsContainer';

import { DayNightSwitcher } from '../Sidebar/DayNightSwitcher';

export const BurgerMenuModal = ({ isOpen, onClose }) => {
	return (
		<BaseModal isOpen={isOpen} onClose={onClose} width="w-[300px]" height="h-full" position="left">
			<div className="flex sticky top-20 flex-col justify-evently py-4">
				<DayNightSwitcher isInModal={true} />
				<MenuButtonsContainer isMenuOpened={true} />
			</div>
		</BaseModal>
	);
};

BurgerMenuModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};
