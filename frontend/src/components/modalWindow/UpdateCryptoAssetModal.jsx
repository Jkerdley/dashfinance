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

	const handleDeleteAsset = async () => {
		if (confirm('Вы уверены что хотите удалить криптоактив?')) {
			try {
				const response = await request(`/cryptoasset/${assetId}`, 'DELETE');

				dispatch(fetchCryptoAssets(response));
				onClose();
			} catch (error) {
				setError(error.message);
				console.error('Ошибка получения обновленного массива криптоактивов', error);
			}
		}
	};

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
