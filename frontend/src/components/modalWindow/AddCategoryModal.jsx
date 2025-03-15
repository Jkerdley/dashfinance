import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BaseModal } from './base/BaseModal';
import { request } from '../../utils';
import { fetchCategories } from '../../store/actions/async';
import { CategoriesForm } from './forms';

export const AddCategoryModal = ({ isOpen, onClose }) => {
	const [formData, setFormData] = useState({
		name: '',
		balance: 0,
		budget: 0,
		icon: 'debit',
	});
	const [error, setError] = useState('');
	const dispatch = useDispatch();

	const handleInputChange = (e) => {
		const value = e.target.value;

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		const nameValue = formData.name;
		const budgetValue = Number(formData.budget);

		if (nameValue.length === 0) {
			alert('Название категории не может быть пустым');
		}

		if (!isNaN(budgetValue) && budgetValue >= 0) {
			try {
				await request('/categories', 'POST', {
					...formData,
					budget: budgetValue,
				});
				dispatch(fetchCategories());
				onClose();
			} catch (err) {
				setError(err.message);
			}
		} else {
			alert('Бюджет должен быть числом и больше нуля');
		}
	};

	return (
		<BaseModal isOpen={isOpen} onClose={onClose} width="md:w-[60vw] w-[90vw]" position="center">
			<section className="flex flex-col p-6 h-full w-full">
				<CategoriesForm
					formData={formData}
					handleSubmit={handleSubmit}
					handleInputChange={handleInputChange}
					handleNameChange={handleNameChange}
					error={error}
					onClose={onClose}
				/>
			</section>
		</BaseModal>
	);
};
