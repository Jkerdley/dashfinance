import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	operationModal: { isOpen: false, type: null },
	cryptoOperationModal: { isOpen: false, type: null },
	burgerModal: { isOpen: false },
	addAccountModal: { isOpen: false },
	updateAccountModal: { isOpen: false, accountIdForUpdate: '' },
	addCategoryModal: { isOpen: false },
	updateCategoryModal: { isOpen: false, categoryIdForUpdate: '' },
	userModal: { isOpen: false },
	addCryptoAssetModal: { isOpen: false },
	updateCryptoAssetModal: { isOpen: false, cryptoAssetIdForUpdate: '' },
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openOperationModal: (state, action) => {
			state.operationModal = { isOpen: true, type: action.payload };
		},
		closeOperationModal: (state) => {
			state.operationModal = { isOpen: false, type: null };
		},
		openCryptoOperationModal: (state, action) => {
			state.cryptoOperationModal = { isOpen: true, type: action.payload };
		},
		closeCryptoOperationModal: (state) => {
			state.cryptoOperationModal = { isOpen: false, type: null };
		},
		openBurgerModal: (state) => {
			state.burgerModal.isOpen = true;
		},
		closeBurgerModal: (state) => {
			state.burgerModal.isOpen = false;
		},
		openAddAccountModal: (state) => {
			state.addAccountModal.isOpen = true;
		},
		closeAddAccountModal: (state) => {
			state.addAccountModal.isOpen = false;
		},
		openUpdateAccountModal: (state, action) => {
			state.updateAccountModal = { isOpen: true, accountIdForUpdate: action.payload };
		},
		closeUpdateAccountModal: (state) => {
			state.updateAccountModal.isOpen = false;
		},
		openAddCategoryModal: (state) => {
			state.addCategoryModal.isOpen = true;
		},
		closeAddCategoryModal: (state) => {
			state.addCategoryModal.isOpen = false;
		},
		openUpdateCategoryModal: (state, action) => {
			state.updateCategoryModal = { isOpen: true, categoryIdForUpdate: action.payload };
		},
		closeUpdateCategoryModal: (state) => {
			state.updateCategoryModal.isOpen = false;
		},
		openAddCryptoAssetModal: (state) => {
			state.addCryptoAssetModal.isOpen = true;
		},
		closeAddCryptoAssetModal: (state) => {
			state.addCryptoAssetModal.isOpen = false;
		},
		openUpdateCryptoAssetModal: (state, action) => {
			state.updateCryptoAssetModal = { isOpen: true, cryptoAssetIdForUpdate: action.payload };
		},
		closeUpdateCryptoAssetModal: (state) => {
			state.updateCryptoAssetModal.isOpen = false;
		},
		openUserModal: (state) => {
			state.userModal.isOpen = true;
		},
		closeUserModal: (state) => {
			state.userModal.isOpen = false;
		},
	},
});

export const {
	openOperationModal,
	closeOperationModal,
	openCryptoOperationModal,
	closeCryptoOperationModal,
	openBurgerModal,
	closeBurgerModal,
	openAddAccountModal,
	closeAddAccountModal,
	openUpdateAccountModal,
	closeUpdateAccountModal,
	openAddCategoryModal,
	closeAddCategoryModal,
	openUpdateCategoryModal,
	closeUpdateCategoryModal,
	openAddCryptoAssetModal,
	closeAddCryptoAssetModal,
	openUpdateCryptoAssetModal,
	closeUpdateCryptoAssetModal,
	openUserModal,
	closeUserModal,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;

export const selectOperationModal = (state) => state.modal.operationModal;
export const selectCryptoOperationModal = (state) => state.modal.cryptoOperationModal;
export const selectBurgerModal = (state) => state.modal.burgerModal;
export const selectAddAccountModal = (state) => state.modal.addAccountModal;
export const selectUpdateAccountModal = (state) => state.modal.updateAccountModal;
export const selectAddCategoryModal = (state) => state.modal.addCategoryModal;
export const selectUpdateCategoryModal = (state) => state.modal.updateCategoryModal;
export const selectAddCryptoAssetModal = (state) => state.modal.addCryptoAssetModal;
export const selectUpdateCryptoAssetModal = (state) => state.modal.updateCryptoAssetModal;
export const selectUserModal = (state) => state.modal.userModal;
