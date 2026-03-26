import React, { useState } from 'react';
import { useAddCategoryMutation } from '../../store/api/backendApi';
import { BaseModal } from './base/BaseModal';
import { CategoriesForm } from './forms';

export const AddCategoryModal = ({ isOpen, onClose }) => {
	const [formData, setFormData] = useState({ name: '', budget: 0, icon: 'debit' });
	const [error, setError] = useState('');
	const [addCategory] = useAddCategoryMutation();

	const handleNameChange = (e) => setFormData((prev) => ({ ...prev, name: e.target.value }));
	const handleInputChange = (e) => {
		const value = e.target.value;
		if (value === '' || !isNaN(value)) setFormData((prev) => ({ ...prev, budget: value }));
		else alert('Пожалуйста, введите цифры');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const budgetValue = Number(formData.budget);

		if (!formData.name.trim()) return alert('Название категории не может быть пустым');
		if (isNaN(budgetValue) || budgetValue < 0) return alert('Бюджет должен быть числом и больше нуля');

		try {
			await addCategory({ ...formData, budget: budgetValue }).unwrap();
			onClose();
		} catch (err) {
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
