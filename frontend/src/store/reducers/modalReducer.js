import { ACTIONS } from '../actionTypes';

const initialState = {
	operationModal: { isOpen: false, type: null },
	burgerModal: { isOpen: false },
	addAccountModal: { isOpen: false },
	updateAccountModal: { isOpen: false, accountIdForUpdate: '' },
	addCategoryModal: { isOpen: false },
	updateCategoryModal: { isOpen: false, categoryIdForUpdate: '' },
	userModal: { isOpen: false },
	addCryptoAssetModal: { isOpen: false },
	updateCryptoAssetModal: { isOpen: false, cryptoAssetIdForUpdate: '' },
};

export const modalReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTIONS.OPEN_OPERATION_MODAL:
			return {
				...state,
				operationModal: {
					isOpen: true,
					type: action.payload,
				},
			};
		case ACTIONS.CLOSE_OPERATION_MODAL:
			return {
				...state,
				operationModal: {
					isOpen: false,
					type: null,
				},
			};
		case ACTIONS.OPEN_BURGER_MODAL:
			return {
				...state,
				burgerModal: {
					isOpen: true,
				},
			};
		case ACTIONS.CLOSE_BURGER_MODAL:
			return {
				...state,
				burgerModal: {
					isOpen: false,
				},
			};
		case ACTIONS.OPEN_ADD_ACCOUNT_MODAL:
			return {
				...state,
				addAccountModal: { isOpen: true },
			};
		case ACTIONS.CLOSE_ADD_ACCOUNT_MODAL:
			return {
				...state,
				addAccountModal: { isOpen: false },
			};
		case ACTIONS.OPEN_UPDATE_ACCOUNT_MODAL:
			return {
				...state,
				updateAccountModal: { isOpen: true, accountIdForUpdate: action.payload },
			};
		case ACTIONS.CLOSE_UPDATE_ACCOUNT_MODAL:
			return {
				...state,
				updateAccountModal: { isOpen: false },
			};

		case ACTIONS.OPEN_ADD_CATEGORY_MODAL:
			return {
				...state,
				addCategoryModal: { isOpen: true },
			};
		case ACTIONS.CLOSE_ADD_CATEGORY_MODAL:
			return {
				...state,
				addCategoryModal: { isOpen: false },
			};
		case ACTIONS.OPEN_UPDATE_CATEGORY_MODAL:
			console.log('action.payload', action.payload);

			return {
				...state,
				updateCategoryModal: { isOpen: true, categoryIdForUpdate: action.payload },
			};
		case ACTIONS.CLOSE_UPDATE_CATEGORY_MODAL:
			return {
				...state,
				updateCategoryModal: { isOpen: false },
			};
		case ACTIONS.OPEN_USER_MODAL:
			console.log('action.payload', action.payload);

			return {
				...state,
				userModal: { isOpen: true },
			};
		case ACTIONS.CLOSE_USER_MODAL:
			return {
				...state,
				userModal: { isOpen: false },
			};
		default:
			return state;
	}
};
