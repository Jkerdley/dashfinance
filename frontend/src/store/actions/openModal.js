import { ACTIONS } from '../actionTypes.js';

export const openModal = (modalParams) => ({
	type: ACTIONS.OPEN_MODAL,
	payload: modalParams,
});
