import React from 'react';
import { BaseModal } from './base/BaseModal';
import { SpendOperationForm } from './forms/SpendOperationForm';
import { AddOperationForm } from './forms';

export const AddOperationModal = ({ isOpen, onClose, operationType }) => {
	return (
		<BaseModal isOpen={isOpen} onClose={onClose} width="w-[48vw]" height="h-[48vh]" position="center">
			{operationType === 'add' ? (
				<AddOperationForm onClose={onClose} operationType={operationType} />
			) : (
				<SpendOperationForm onClose={onClose} operationType={operationType} />
			)}
		</BaseModal>
	);
};
