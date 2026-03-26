import React, { useState } from 'react';
import { useDeleteCryptoAssetMutation } from '../../store/api/backendApi';
import { BaseModal } from './base/BaseModal';
import { CryptoAssetUpdate } from './forms';
import DeleteIcon from '../../assets/icons/delete-icon.svg';
import OutlineButton from '../buttons/OutlineButton';

export const UpdateCryptoAssetModal = ({ cryptoAssetsInCurrency, assetId, isOpen, onClose }) => {
	const [error, setError] = useState('');
	const [deleteCryptoAsset] = useDeleteCryptoAssetMutation();

	const selectedAsset = cryptoAssetsInCurrency.find((asset) => asset.id === assetId);

	const handleDeleteAsset = async () => {
		if (confirm('Вы уверены что хотите удалить криптоактив?')) {
			try {
				await deleteCryptoAsset({ assetId, _id: selectedAsset._id }).unwrap();
				onClose();
			} catch (error) {
				setError(error.data?.error || error.message);
				console.error('Ошибка при удалении криптоактива', error);
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
