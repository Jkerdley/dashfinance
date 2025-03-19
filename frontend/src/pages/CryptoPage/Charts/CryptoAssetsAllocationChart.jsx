import React, { memo } from 'react';
import { PieDiagramChart } from '../../../components/Charts/PieDiagramChart';

export const CryptoAssetsAllocationChart = memo(({ cryptoAssetsInCurrency }) => {
	const mappenData = cryptoAssetsInCurrency.map((asset) => ({
		name: asset.name,
		value: parseFloat(asset.profit.slice(1).trim()),
	}));
	const sortedData = mappenData.sort((a, b) => b.value - a.value);

	return cryptoAssetsInCurrency.length === 0 ? (
		<span>Добавьте активы чтобы увидеть график</span>
	) : (
		<div className="relative">
			<span className="absolute top-3/4 left-1/2 transform -translate-x-1/2">Аллокация</span>
			<PieDiagramChart mappedData={sortedData} isCrypto={true} />
		</div>
	);
});
CryptoAssetsAllocationChart.displayName = 'CryptoAssetsAllocationChart';
