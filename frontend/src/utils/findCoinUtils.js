export const findAccountName = (fetchedCoinsPrices, assetId) => {
	const account = fetchedCoinsPrices.find((accountItem) => assetId === accountItem.id);
	return account ? account.symbol : 'Наличные';
};

export const findCoinIcon = (fetchedCoinsPrices, coinId) => {
	const coin = fetchedCoinsPrices.find((coinItem) => coinId === coinItem.id);
	return coin ? coin.icon : null;
};
export const findCoinSymbol = (fetchedCoinsPrices, coinId) => {
	const coin = fetchedCoinsPrices.find((coinItem) => coinId === coinItem.id);
	return coin ? coin.symbol : null;
};
