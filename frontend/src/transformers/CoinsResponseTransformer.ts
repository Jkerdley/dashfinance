export interface CoinApiData {
	name: string;
	key: string;
	price: string | number;
	images: {
		icon: string;
	};
	percentChange: {
		d7: string | number;
		h24: string | number;
		h1?: string | number;
	};
	symbol: string;
}

export interface CoinsApiResponse {
	data: CoinApiData[];
}

export interface TransformedCoin {
	name: string;
	id: string;
	price: number;
	icon: string;
	priceChange1w: number;
	priceChange1d: number;
	priceChange1h: number;
	symbol: string;
}

export const coinsResponseTransformer = (response: CoinsApiResponse): TransformedCoin[] => {
	return response.data.map((dataset) => ({
		name: dataset.name,
		id: dataset.key,
		price: Number(dataset.price),
		icon: dataset.images.icon,
		priceChange1w: Number(Number(dataset.percentChange.d7).toFixed(2)),
		priceChange1d: Number(Number(dataset.percentChange.h24).toFixed(2)),
		priceChange1h: Number(Number(dataset.percentChange.h24).toFixed(2)),
		symbol: dataset.symbol,
	}));
};
