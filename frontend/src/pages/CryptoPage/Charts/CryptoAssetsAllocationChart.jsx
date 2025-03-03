import React from 'react';
import { PieDiagramChart } from '../../../components/Charts/PieDiagramChart';
import { useFetchCryptoAssetsInCurrency } from '../../../hooks';

export const CryptoAssetsAllocationChart = () => {
	const { cryptoAssetsInCurrency, isLoading } = useFetchCryptoAssetsInCurrency();
	const mappenData = cryptoAssetsInCurrency.map((asset) => ({
		name: asset.name,
		value: parseFloat(asset.profit.slice(1).trim()),
	}));

	return <div>{<PieDiagramChart mappedData={mappenData} isCrypto={true} />}</div>;
};

// mappedData = [{name: 'Досуг', value: 15000},]
