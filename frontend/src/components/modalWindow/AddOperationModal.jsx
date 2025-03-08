import React from 'react';
import PropTypes from 'prop-types';
import { BaseModal } from './base/BaseModal';
import { OperationForm } from './forms/OperationForm';

export const AddOperationModal = ({ isOpen, onClose, operationType }) => {
	return (
		<BaseModal isOpen={isOpen} onClose={onClose} width="w-[48vw]" height="h-[48vh]" position="center">
			<OperationForm onClose={onClose} operationType={operationType} />
		</BaseModal>
	);
};

AddOperationModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	operationType: PropTypes.oneOf(['add', 'spend']),
};
