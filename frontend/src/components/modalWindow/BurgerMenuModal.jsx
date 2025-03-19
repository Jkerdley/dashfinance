import React from 'react';
import { BaseModal } from './base/BaseModal';
import { MenuButtonsContainer } from '../Sidebar/MenuButtonsContainer';

import { DayNightSwitcher } from '../Sidebar/DayNightSwitcher';
import { useDispatch, useSelector } from 'react-redux';
import { closeBurgerModal } from '../../store/actions';
import { selectBurgerModal } from '../../store/selectors';

export const BurgerMenuModal = () => {
	const dispatch = useDispatch();
	const burgerModal = useSelector(selectBurgerModal);
	const handleCloseBurgerModal = () => dispatch(closeBurgerModal());

	return (
		<BaseModal
			isOpen={burgerModal.isOpen}
			onClose={handleCloseBurgerModal}
			width="w-[300px]"
			height="h-full"
			position="left"
		>
			<div className="flex sticky top-20 flex-col justify-evently py-4">
				<DayNightSwitcher isInModal={true} />
				<MenuButtonsContainer isMenuOpened={true} />
			</div>
		</BaseModal>
	);
};
