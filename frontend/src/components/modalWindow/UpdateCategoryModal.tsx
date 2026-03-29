import { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useUpdateCategoryMutation, useDeleteCategoryMutation } from '../../store/api/backendApi';
import { BaseModal } from './base/BaseModal';
import { CategoriesForm } from './forms';
import DeleteIcon from '../../assets/icons/delete-icon.svg';
import OutlineButton from '../buttons/OutlineButton';
import { useFetchCategoriesInCurrency } from '../../hooks';
import { SortTypesValue } from '../../constants/operations';

interface UpdateCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    categoryId: string;
    currentSortType: SortTypesValue;
}

export const UpdateCategoryModal = ({ isOpen, onClose, categoryId, currentSortType }: UpdateCategoryModalProps) => {
    const { categoriesInCurrency, categoriesIsLoading } = useFetchCategoriesInCurrency(currentSortType);
    const selectedCategory = categoriesInCurrency.find((category: any) => category.id === categoryId);

    const [formData, setFormData] = useState({
        name: '',
        budget: '',
        icon: 'debit',
    });

    useEffect(() => {
        if (selectedCategory) {
            setFormData({
                name: selectedCategory.name || '',
                budget: selectedCategory.budget ? String(parseFloat(String(selectedCategory.budget).replace(/[^\d.-]/g, ''))) : '',
                icon: selectedCategory.icon || 'debit',
            });
        }
    }, [selectedCategory]);

    const [error, setError] = useState('');
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (value === '' || !isNaN(Number(value))) {
            setFormData((prev) => ({
                ...prev,
                budget: value,
            }));
        } else {
            alert('Пожалуйста, введите цифры');
        }
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData((prev) => ({
            ...prev,
            name: value,
        }));
    };

    const handleDeleteCategory = async () => {
        if (window.confirm('Вы уверены что хотите удалить категорию расходов?')) {
            try {
                await deleteCategory(categoryId).unwrap();
                onClose();
            } catch (error: any) {
                setError(error.data?.error || error.message);
            }
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nameValue = formData.name;

        if (nameValue.length === 0) {
            alert('Название категории не может быть пустым');
            return;
        }
        const budgetValue = Number(formData.budget);

        if (!isNaN(budgetValue) && budgetValue >= 0) {
            try {
                await updateCategory({
                    id: categoryId,
                    ...formData,
                    budget: budgetValue,
                }).unwrap();
                onClose();
            } catch (error: any) {
                setError(error.data?.error || error.message);
            }
        } else {
            alert('Бюджет должен быть числом и больше нуля');
        }
    };

    if (categoriesIsLoading || !selectedCategory) return null;

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} width="md:w-[60vw] w-[90vw]" position="center">
            <section className="flex flex-col justify-center p-4 h-full w-full">
                <CategoriesForm
                    formData={formData as any}
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    handleNameChange={handleNameChange}
                    error={error}
                    onClose={onClose}
                    isUpdateForm={true}
                />

                <div className="flex justify-center mb-4">
                    <OutlineButton icon={DeleteIcon} onClick={handleDeleteCategory}>
                        Удалить категорию
                    </OutlineButton>
                </div>
            </section>
        </BaseModal>
    );
};
