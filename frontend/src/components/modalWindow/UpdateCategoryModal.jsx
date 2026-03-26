import React, { useState } from 'react';
import { useUpdateCategoryMutation, useDeleteCategoryMutation } from '../../store/api/backendApi';
import { BaseModal } from './base/BaseModal';
import { CategoriesForm } from './forms';
import DeleteIcon from '../../assets/icons/delete-icon.svg';
import OutlineButton from '../buttons/OutlineButton';

export const UpdateCategoryModal = ({ isOpen, onClose, categoryId, categoriesInCurrency }) => {
	const selectedCategory = categoriesInCurrency.find((account) => account.id === categoryId);
	const transformedCategory = {
		...selectedCategory,
		budget: parseFloat(selectedCategory.budget.slice(1).trim()),
	};

	const [formData, setFormData] = useState({
		name: transformedCategory.name,
		budget: transformedCategory.budget,
		icon: transformedCategory.icon,
	});

	const [error, setError] = useState('');
	const [updateCategory] = useUpdateCategoryMutation();
	const [deleteCategory] = useDeleteCategoryMutation();

	const handleInputChange = (event) => {
		const value = event.target.value;

		if (value === '' || !isNaN(value)) {
			setFormData((prev) => ({
				...prev,
				budget: value,
			}));
		} else {
			alert('Пожалуйста, введите цифры');
		}
	};

	const handleNameChange = (event) => {
		const value = event.target.value;
		setFormData((prev) => ({
			...prev,
			name: value,
		}));
	};

	const handleDeleteCategory = async () => {
		if (confirm('Вы уверены что хотите удалить категорию расходов?')) {
			try {
				await deleteCategory(categoryId).unwrap();
				onClose();
			} catch (error) {
				setError(error.data?.error || error.message);
			}
		}
	};

	const handleSubmit = async (event) => {
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
			} catch (error) {
				setError(error.data?.error || error.message);
			}
		} else {
			alert('Бюджет должен быть числом и больше нуля');
		}
	};

	return (
		<BaseModal isOpen={isOpen} onClose={onClose} width="md:w-[60vw] w-[90vw]" position="center">
			<section className="flex flex-col justify-center p-4 h-full w-full">
				<CategoriesForm
					formData={formData}
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
