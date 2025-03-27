import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BaseModal } from './base/BaseModal';
import { request } from '../../utils';
import { CryptoAssetUpdate } from './forms';
import DeleteIcon from '../../assets/icons/delete-icon.svg';
import OutlineButton from '../buttons/OutlineButton';
import { fetchCryptoAssets } from '../../store/actions/async';

export const UpdateCryptoAssetModal = ({ cryptoAssetsInCurrency, assetId, isOpen, onClose }) => {
	const [error, setError] = useState('');
	const dispatch = useDispatch();

	const selectedAsset = cryptoAssetsInCurrency.find((asset) => asset.id === assetId);

	console.log('selectedAsset', selectedAsset);
	console.log('assetId', assetId);

	// const [formData, setFormData] = useState({
	// 	name: selectedAsset.name,
	// 	assetAmount: selectedAsset.assetAmount,
	// 	icon: selectedAsset.icon,
	// });

	// const handleInputChange = (event) => {
	// 	const value = event.target.value;

	// 	if (value === '' || !isNaN(value)) {
	// 		setFormData((prev) => ({
	// 			...prev,
	// 			assetAmount: value,
	// 		}));
	// 	} else {
	// 		alert('Пожалуйста, введите цифры');
	// 	}
	// };

	const handleDeleteAsset = async () => {
		if (confirm('Вы уверены что хотите удалить криптоактив?')) {
			try {
				const response = await request(`/cryptoasset/${assetId}`, 'DELETE');
				console.log('response after delete', response);

				dispatch(fetchCryptoAssets(response));
				onClose();
			} catch (error) {
				setError(error.message);
				console.log('Ошибка получения обновленного массива криптоактивов', error);
			}
		}
	};

	// const handleSubmit = async (event) => {
	// 	event.preventDefault();

	// 	const nameValue = formData.name;

	// 	if (nameValue.length === 0) {
	// 		alert('Название категории не может быть пустым');
	// 	}
	// 	const assetAmountValue = Number(formData.assetAmount);

	// 	if (!isNaN(assetAmountValue) && assetAmountValue >= 0) {
	// 		try {
	// 			await request(`/crypto/${assetId}`, 'PUT', {
	// 				...formData,
	// 				assetAmount: assetAmountValue,
	// 			});
	// 			// dispatch(fetchCategories());
	// 			onClose();
	// 		} catch (error) {
	// 			setError(error.message);
	// 		}
	// 	} else {
	// 		alert('Бюджет должен быть числом и больше нуля');
	// 	}
	// };
	console.log('selectedAsset in modal', selectedAsset);

	return (
		<BaseModal isOpen={isOpen} onClose={onClose} width="md:w-[60vw] w-[90vw]" position="center">
			<section className="flex flex-col justify-center p-4 h-full w-full">
				<CryptoAssetUpdate selectedAsset={selectedAsset} error={error} onClose={onClose} />
				<div className="flex justify-center mb-4">
					<OutlineButton icon={DeleteIcon} onClick={handleDeleteAsset}>
						Удалить актив
					</OutlineButton>
				</div>
			</section>
		</BaseModal>
	);
};
