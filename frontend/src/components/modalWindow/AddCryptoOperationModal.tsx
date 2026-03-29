import { BaseModal } from './base/BaseModal';
import { SpendOperationForm } from './forms/SpendOperationForm';
import { AddOperationForm } from './forms';

interface AddCryptoOperationModalProps {
    isOpen: boolean;
    onClose: () => void;
    operationType: 'add' | 'spend';
}

export const AddCryptoOperationModal = ({ isOpen, onClose, operationType }: AddCryptoOperationModalProps) => {
    return (
        <BaseModal isOpen={isOpen} onClose={onClose} width="md:w-[60vw] w-[90vw]" position="center">
            {operationType === 'add' ? (
                <AddOperationForm onClose={onClose} operationType={operationType} />
            ) : (
                <SpendOperationForm onClose={onClose} operationType={operationType} />
            )}
        </BaseModal>
    );
};
