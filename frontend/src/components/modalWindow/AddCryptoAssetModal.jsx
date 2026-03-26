import React, { useCallback, useState } from 'react';
import { useAddCryptoAssetMutation } from '../../store/api/backendApi';
import { BaseModal } from './base/BaseModal';
import { debounce } from '../../utils';
import { CryptoAssetForm } from './forms';

export const AddCryptoAssetModal = ({ cryptoCoins, isOpen, onClose }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [showDropdown, setShowDropdown] = useState(false);
	const [error, setError] = useState('');
	const [addCryptoAsset] = useAddCryptoAssetMutation();
	const [formData, setFormData] = useState({
		name: '',
		coinId: '',
		symbol: '',
		averagePrice: 0,
		totalSumm: 0,
		assetAmount: 0,
		history: [],
		icon: '',
	});

	const debouncedSearch = useCallback(
		debounce((inputTerm) => {
			const searchResults = cryptoCoins
				.filter(
					(coin) =>
						coin.name.toLowerCase().includes(inputTerm.toLowerCase()) ||
						coin.symbol.toLowerCase().includes(inputTerm.toLowerCase()),
				)
				.slice(0, 20);
			setSearchResults(searchResults);
			setShowDropdown(searchResults.length > 0);
		}, 500),
		[cryptoCoins],
	);

	const handleFindCrypto = (event) => {
		const value = event.target.value;
		setSearchTerm(value);
		setError('');
		debouncedSearch(value);
	};

	const handleSelectCoin = (coin) => {
		setFormData({
			...formData,
			name: coin.name,
			coinId: coin.id,
			symbol: coin.symbol,
			icon: coin.icon,
		});
		setShowDropdown(false);
		setSearchTerm(coin.name);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const nameValue = formData.name;

		if (nameValue.length === 0) {
			alert('Нужно выбрать криптовалюту');
		} else {
			try {
				await addCryptoAsset(formData).unwrap();
				onClose();
			} catch (err) {
				setError(err.data?.error || err.message);
			}
		}
	};

	return (
		<BaseModal isOpen={isOpen} onClose={onClose} width="md:w-[60vw] w-[90vw]" position="center">
			<section className="flex flex-col p-6 h-full w-full">
				<CryptoAssetForm
					formData={formData}
					searchTerm={searchTerm}
					handleSubmit={handleSubmit}
					error={error}
					onClose={onClose}
					handleFindCrypto={handleFindCrypto}
					handleSelectCoin={handleSelectCoin}
					searchResults={searchResults}
					showDropdown={showDropdown}
				/>
			</section>
		</BaseModal>
	);
};
