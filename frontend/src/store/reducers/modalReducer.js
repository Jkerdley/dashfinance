import { ACTIONS } from '../actionTypes';

const initialModalState = {
	modal: {
		isOpen: false,
		question: '',
		onConfirm: () => {},
		onCancel: () => {},
	},
};

export const modalReducer = (state = initialModalState, action) => {
	switch (action.type) {
		case ACTIONS.OPEN_MODAL:
			return {
				...state,
				modal: {
					...initialModalState.modal,
					...action.payload,
					isOpen: true,
				},
			};
		case ACTIONS.CLOSE_MODAL:
			return initialModalState;
		default:
			return state;
	}
};
