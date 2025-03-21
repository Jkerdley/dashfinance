import { ACTIONS } from '../actionTypes';

export const openOperationModal = (operationType) => ({
	type: ACTIONS.OPEN_OPERATION_MODAL,
	payload: operationType,
});

export const closeOperationModal = () => ({
	type: ACTIONS.CLOSE_OPERATION_MODAL,
});

export const openCryptoOperationModal = (operationType) => ({
	type: ACTIONS.OPEN_CRYPTO_OPERATION_MODAL,
	payload: operationType,
});

export const closeCryptoOperationModal = () => ({
	type: ACTIONS.CLOSE_CRYPTO_OPERATION_MODAL,
});

export const openBurgerModal = () => ({
	type: ACTIONS.OPEN_BURGER_MODAL,
});

export const closeBurgerModal = () => ({
	type: ACTIONS.CLOSE_BURGER_MODAL,
});

export const openAddAccountModal = () => ({
	type: ACTIONS.OPEN_ADD_ACCOUNT_MODAL,
});

export const closeAddAccountModal = () => ({
	type: ACTIONS.CLOSE_ADD_ACCOUNT_MODAL,
});

export const openUpdateAccountModal = (id) => ({
	type: ACTIONS.OPEN_UPDATE_ACCOUNT_MODAL,
	payload: id,
});

export const closeUpdateAccountModal = () => ({
	type: ACTIONS.CLOSE_UPDATE_ACCOUNT_MODAL,
});

export const openAddCategoryModal = () => ({
	type: ACTIONS.OPEN_ADD_CATEGORY_MODAL,
});

export const closeAddCategoryModal = () => ({
	type: ACTIONS.CLOSE_ADD_CATEGORY_MODAL,
});

export const openUpdateCategoryModal = (id) => ({
	type: ACTIONS.OPEN_UPDATE_CATEGORY_MODAL,
	payload: id,
});

export const closeUpdateCategoryModal = () => ({
	type: ACTIONS.CLOSE_UPDATE_CATEGORY_MODAL,
});

export const openAddCryptoAssetModal = () => ({
	type: ACTIONS.OPEN_ADD_CRYPTO_ASSET_MODAL,
});

export const closeAddCryptoAssetModal = () => ({
	type: ACTIONS.CLOSE_ADD_CRYPTO_ASSET_MODAL,
});

export const openUpdateCryptoAssetModal = (id) => ({
	type: ACTIONS.OPEN_UPDATE_CRYPTO_ASSET_MODAL,
	payload: id,
});

export const closeUpdateCryptoAssetModal = () => ({
	type: ACTIONS.CLOSE_UPDATE_CRYPTO_ASSET_MODAL,
});

export const openUserModal = () => ({
	type: ACTIONS.OPEN_USER_MODAL,
});

export const closeUserModal = () => ({
	type: ACTIONS.CLOSE_USER_MODAL,
});
