import React from 'react';
import { PieDiagramChart } from '../../../components/Charts/PieDiagramChart';
import { Loader } from '../../../components/Loaders/Loader';

export const CryptoAssetsAllocationChart = ({ cryptoAssetsInCurrency, isLoading }) => {
	const mappenData = cryptoAssetsInCurrency.map((asset) => ({
		name: asset.name,
		value: parseFloat(asset.profit.slice(1).trim()),
	}));
	const sortedData = mappenData.sort((a, b) => b.value - a.value);
	console.log('mappenData', mappenData);
	console.log('sortedData', sortedData);

	return cryptoAssetsInCurrency.length === 0 ? (
		<span>Добавьте активы чтобы увидеть график</span>
	) : (
		<div className="relative">
			<span className="absolute top-50 right-40">Аллокация</span>
			{isLoading ? <Loader /> : <PieDiagramChart mappedData={sortedData} isCrypto={true} />}
		</div>
	);
};
