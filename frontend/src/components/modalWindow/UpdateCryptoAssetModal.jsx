import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BaseModal } from './base/BaseModal';
import { request } from '../../utils';
import { CategoriesForm } from './forms';
import DeleteIcon from '../../assets/icons/delete-icon.svg';
import OutlineButton from '../buttons/OutlineButton';

export const UpdateCryptoAssetModal = ({ isOpen, onClose, assetId, cryptoAssetsInCurrency }) => {
	const selectedAsset = cryptoAssetsInCurrency.find((asset) => asset.id === assetId);
	// const transformedCategory = {
	// 	...selectedAsset,
	// 	budget: parseFloat(selectedAsset.budget.slice(1).trim()),
	// };

	const [formData, setFormData] = useState({
		name: selectedAsset.name,
		budget: selectedAsset.budget,
		icon: selectedAsset.icon,
	});

	const [error, setError] = useState('');
	const dispatch = useDispatch();

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
				await request(`/categories/${assetId}`, 'DELETE');
				// dispatch(fetchCategories());
				onClose();
			} catch (error) {
				setError(error.message);
			}
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const nameValue = formData.name;

		if (nameValue.length === 0) {
			alert('Название категории не может быть пустым');
		}
		const budgetValue = Number(formData.budget);

		if (!isNaN(budgetValue) && budgetValue >= 0) {
			try {
				await request(`/categories/${assetId}`, 'PUT', {
					...formData,
					budget: budgetValue,
				});
				// dispatch(fetchCategories());
				onClose();
			} catch (error) {
				setError(error.message);
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
