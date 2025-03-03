import React from 'react';
import { PieDiagramChart } from '../../../components/Charts/PieDiagramChart';
import { useFetchCryptoAssetsInCurrency } from '../../../hooks';
import { Loader } from '../../../components/Loaders/Loader';

export const CryptoAssetsAllocationChart = () => {
	const { cryptoAssetsInCurrency, isLoading } = useFetchCryptoAssetsInCurrency();
	const mappenData = cryptoAssetsInCurrency.map((asset) => ({
		name: asset.name,
		value: parseFloat(asset.profit.slice(1).trim()),
	}));

	return cryptoAssetsInCurrency.length === 0 ? (
		<span>Добавьте активы чтобы увидеть график</span>
	) : (
		<div className="relative">
			<span className="absolute top-50 right-40">Аллокация</span>
			{isLoading ? <Loader /> : <PieDiagramChart mappedData={mappenData} isCrypto={true} />}
		</div>
	);
};
