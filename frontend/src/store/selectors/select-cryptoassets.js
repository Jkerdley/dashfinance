export const selectCryptoAssets = (state) => state.cryptoAssets.data;
export const selectCryptoAssetsHistory = (state) => state.cryptoAssets.cryptoHistory;
export const selectCryptoAssetsIsLoading = (state) => state.cryptoAssets.isLoading;
export const selectCryptoAssetsError = (state) => state.cryptoAssets.error;
