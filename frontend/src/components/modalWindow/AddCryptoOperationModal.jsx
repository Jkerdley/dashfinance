import React from 'react';
import { BaseModal } from './base/BaseModal';
import { SpendOperationForm } from './forms/SpendOperationForm';
import { AddOperationForm } from './forms';
import { useDispatch, useSelector } from 'react-redux';
import { closeCryptoOperationModal } from '../../store/actions';
import { selectCryptoOperationModal } from '../../store/selectors';

export const AddCryptoOperationModal = () => {
	const dispatch = useDispatch();

	const cryptoOperationModal = useSelector(selectCryptoOperationModal);
	const handleCloseCryptoOperationModal = () => dispatch(closeCryptoOperationModal());
	return (
		<BaseModal
			isOpen={cryptoOperationModal.isOpen}
			onClose={handleCloseCryptoOperationModal}
			width="md:w-[60vw] w-[90vw]"
			position="center"
		>
			{cryptoOperationModal.type === 'add' ? (
				<AddOperationForm
					onClose={handleCloseCryptoOperationModal}
					operationType={cryptoOperationModal.type}
				/>
			) : (
				<SpendOperationForm
					onClose={handleCloseCryptoOperationModal}
					operationType={cryptoOperationModal.type}
				/>
			)}
		</BaseModal>
	);
};
