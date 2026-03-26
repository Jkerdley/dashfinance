import React, { useCallback, useState } from 'react';
import { useAddCryptoAssetMutation } from '../../store/api/backendApi';
import { BaseModal } from './base/BaseModal';
import { debounce } from '../../utils';
import { CryptoAssetForm } from './forms';

export const AddCryptoAssetModal = ({ isOpen, onClose, cryptoCoins }) => {
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
			if (!cryptoCoins) return;
			const results = cryptoCoins
				.filter(
					(coin) =>
						coin.name.toLowerCase().includes(inputTerm.toLowerCase()) ||
						coin.symbol.toLowerCase().includes(inputTerm.toLowerCase()),
				)
				.slice(0, 20);
			setSearchResults(results);
			setShowDropdown(results.length > 0);
		}, 500),
		[cryptoCoins],
	);

	const handleFindCrypto = (e) => {
		const value = e.target.value;
		setSearchTerm(value);
		setError('');
		debouncedSearch(value);
	};

	const handleSelectCoin = (coin) => {
		setFormData({ ...formData, name: coin.name, coinId: coin.id, symbol: coin.symbol, icon: coin.icon });
		setShowDropdown(false);
		setSearchTerm(coin.name);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.name) return alert('Нужно выбрать криптовалюту');

		try {
			await addCryptoAsset(formData).unwrap();
			onClose();
		} catch (err) {
			setError(err.data?.error || err.message);
		}
	};

	return (
		<BaseModal isOpen={isOpen} onClose={onClose} width="md:w-[60vw] w-[90vw]" position="center">
			<div className="flex flex-col p-6 h-full w-full">
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
			</div>
		</BaseModal>
	);
};
