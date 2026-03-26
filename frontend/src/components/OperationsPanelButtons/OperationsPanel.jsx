import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { openCryptoOperationModal, openOperationModal } from '../../store/slices/modalSlice';
import { useGetAccountsQuery, useGetCategoriesQuery } from '../../store/api/backendApi';
import { CryptoPanelButtons, FinancesPanelButtons } from './';

export const OperationsPanel = ({ isCrypto }) => {
	const dispatch = useDispatch();
	const { data: accounts = [] } = useGetAccountsQuery();
	const { data: categories = [] } = useGetCategoriesQuery();

	const canOpenModal = accounts.length > 0 && categories.length > 0;

	const handleOperationClick = useCallback(
		(type) => {
			if (!canOpenModal) {
				alert('Сначала необходимо добавить счета и категории расходов');
				return;
			}

			if (isCrypto) {
				dispatch(openCryptoOperationModal(type));
			} else {
				dispatch(openOperationModal(type));
			}
		},
		[canOpenModal, dispatch],
	);

	return isCrypto ? (
		<CryptoPanelButtons handleOperationClick={handleOperationClick} />
	) : (
		<FinancesPanelButtons handleOperationClick={handleOperationClick} />
	);
};
