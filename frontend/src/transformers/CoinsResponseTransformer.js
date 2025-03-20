export const coinsResponseTransformer = (array) => {
	const mappedArray = array.data.map((dataset) => {
		return {
			name: dataset.name,
			id: dataset.key,
			price: Number(dataset.price),
			icon: dataset.images.icon,
			priceChange1w: Number(Number(dataset.percentChange.d7).toFixed(2)),
			priceChange1d: Number(Number(dataset.percentChange.h24).toFixed(2)),
			priceChange1h: Number(Number(dataset.percentChange.h24).toFixed(2)),
			symbol: dataset.symbol,
		};
	});
	return mappedArray;
};
