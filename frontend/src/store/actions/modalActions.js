import { ACTIONS } from '../actionTypes';

export const openOperationModal = (operationType) => ({
	type: ACTIONS.OPEN_OPERATION_MODAL,
	payload: operationType,
});

export const closeOperationModal = () => ({
	type: ACTIONS.CLOSE_OPERATION_MODAL,
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
