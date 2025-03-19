import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openCryptoOperationModal, openOperationModal } from '../../store/actions/modalActions';
import { selectAccounts, selectCategories } from '../../store/selectors';
import { CryptoPanelButtons, FinancesPanelButtons } from './';

export const OperationsPanel = ({ isCrypto }) => {
	const dispatch = useDispatch();
	const accounts = useSelector(selectAccounts);
	const categories = useSelector(selectCategories);

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
