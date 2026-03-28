import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useAddCategoryMutation } from '../../store/api/backendApi';
import { BaseModal } from './base/BaseModal';
import { CategoriesForm } from './forms';

interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddCategoryModal = ({ isOpen, onClose }: AddCategoryModalProps) => {
    const [formData, setFormData] = useState({ name: '', budget: '', icon: 'debit' });
    const [error, setError] = useState('');
    const [addCategory] = useAddCategoryMutation();

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({ ...prev, name: e.target.value }));
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || !isNaN(Number(value))) setFormData((prev) => ({ ...prev, budget: value }));
        else alert('Пожалуйста, введите цифры');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const budgetValue = Number(formData.budget);

        if (!formData.name.trim()) return alert('Название категории не может быть пустым');
        if (isNaN(budgetValue) || budgetValue < 0) return alert('Бюджет должен быть числом и больше нуля');

        try {
            await addCategory({ ...formData, budget: budgetValue, balance: 0 }).unwrap();
            onClose();
        } catch (err: any) {
            setError(err.data?.error || err.message);
        }
    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} width="md:w-[60vw] w-[90vw]" position="center">
            <div className="flex flex-col p-6 h-full w-full">
                <CategoriesForm
                    formData={formData}
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    handleNameChange={handleNameChange}
                    error={error}
                    onClose={onClose}
                />
            </div>
        </BaseModal>
    );
};
