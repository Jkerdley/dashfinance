import React from 'react';
import { BaseModal } from './base/BaseModal';
import { SpendOperationForm } from './forms/SpendOperationForm';
import { AddOperationForm } from './forms';
import { useDispatch, useSelector } from 'react-redux';
import { closeOperationModal } from '../../store/actions';
import { selectOperationModal } from '../../store/selectors';

export const AddOperationModal = () => {
	const dispatch = useDispatch();
	const operationModal = useSelector(selectOperationModal);
	const handleCloseOperationModal = () => dispatch(closeOperationModal());
	return (
		<BaseModal
			isOpen={operationModal.isOpen}
			onClose={handleCloseOperationModal}
			width="md:w-[60vw] w-[90vw]"
			position="center"
		>
			{operationModal.type === 'add' ? (
				<AddOperationForm onClose={handleCloseOperationModal} operationType={operationModal.type} />
			) : (
				<SpendOperationForm onClose={handleCloseOperationModal} operationType={operationModal.type} />
			)}
		</BaseModal>
	);
};
