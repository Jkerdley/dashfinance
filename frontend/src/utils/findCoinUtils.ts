interface CoinPriceItem {
	id: string;
	symbol: string;
	icon: string;
	[key: string]: any;
}

export const findAccountName = (fetchedCoinsPrices: CoinPriceItem[], assetId: string): string => {
	const account = fetchedCoinsPrices.find((accountItem) => assetId === accountItem.id);
	return account ? account.symbol : 'Наличные';
};

export const findCoinIcon = (fetchedCoinsPrices: CoinPriceItem[], coinId: string): string | null => {
	const coin = fetchedCoinsPrices.find((coinItem) => coinId === coinItem.id);
	return coin ? coin.icon : null;
};

export const findCoinSymbol = (fetchedCoinsPrices: CoinPriceItem[], coinId: string): string | null => {
	const coin = fetchedCoinsPrices.find((coinItem) => coinId === coinItem.id);
	return coin ? coin.symbol : null;
};
