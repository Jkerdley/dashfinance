import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/slices/modalSlice';
import { MODAL_TYPES } from '../../constants/modals';
import { useGetAccountsQuery, useGetCategoriesQuery } from '../../store/api/backendApi';
import { CryptoPanelButtons, FinancesPanelButtons } from './';

export const OperationsPanel = ({ isCrypto }) => {
	const dispatch = useDispatch();
	const { data: accounts = [] } = useGetAccountsQuery();
	const { data: categories = [] } = useGetCategoriesQuery();

	const canOpenModal = accounts.length > 0 && categories.length > 0;

	const handleOperationClick = (type) => {
		if (!canOpenModal) {
			window.alert('Сначала необходимо добавить счета и категории расходов');
			return;
		}

		if (isCrypto) {
			dispatch(
				openModal({
					modalType: MODAL_TYPES.CRYPTO_OPERATION,
					modalProps: { operationType: type },
				}),
			);
		} else {
			dispatch(
				openModal({
					modalType: MODAL_TYPES.OPERATION,
					modalProps: { operationType: type },
				}),
			);
		}
	};

	return isCrypto ? (
		<CryptoPanelButtons handleOperationClick={handleOperationClick} />
	) : (
		<FinancesPanelButtons handleOperationClick={handleOperationClick} />
	);
};
