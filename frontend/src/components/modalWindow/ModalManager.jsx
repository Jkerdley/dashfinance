import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentModal, closeModal } from '../../store/slices/modalSlice';
import { MODAL_TYPES } from '../../constants/modals';

import { AddAccountModal } from './AddAccountModal';
import { UpdateAccountModal } from './UpdateAccountModal';
import { AddCategoryModal } from './AddCategoryModal';
import { UpdateCategoryModal } from './UpdateCategoryModal';
import { AddCryptoAssetModal } from './AddCryptoAssetModal';
import { UpdateCryptoAssetModal } from './UpdateCryptoAssetModal';
import { AddOperationModal } from './AddOperationModal';
import { AddCryptoOperationModal } from './AddCryptoOperationModal';
import { BurgerMenuModal } from './BurgerMenuModal';
import { UpdateUserModal } from './UpdateUserModal';

const MODAL_COMPONENTS = {
	[MODAL_TYPES.ADD_ACCOUNT]: AddAccountModal,
	[MODAL_TYPES.UPDATE_ACCOUNT]: UpdateAccountModal,
	[MODAL_TYPES.ADD_CATEGORY]: AddCategoryModal,
	[MODAL_TYPES.UPDATE_CATEGORY]: UpdateCategoryModal,
	[MODAL_TYPES.ADD_CRYPTO_ASSET]: AddCryptoAssetModal,
	[MODAL_TYPES.UPDATE_CRYPTO_ASSET]: UpdateCryptoAssetModal,
	[MODAL_TYPES.OPERATION]: AddOperationModal,
	[MODAL_TYPES.CRYPTO_OPERATION]: AddCryptoOperationModal,
	[MODAL_TYPES.BURGER_MENU]: BurgerMenuModal,
	[MODAL_TYPES.USER_SETTINGS]: UpdateUserModal,
};

export const ModalManager = () => {
	const dispatch = useDispatch();
	const { modalType, modalProps } = useSelector(selectCurrentModal);

	if (!modalType) return null;

	const SpecificModal = MODAL_COMPONENTS[modalType];

	if (!SpecificModal) return null;

	return <SpecificModal isOpen={true} onClose={() => dispatch(closeModal())} {...modalProps} />;
};
