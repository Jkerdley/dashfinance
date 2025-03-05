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
