import React from 'react';
import { useDispatch } from 'react-redux';
import AddIcon from '../../../assets/icons/add-icon.svg';
import { CryptoAssets } from './CryptoAssets';
import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader';
import { EditAddDeleteButton } from '../../../components/buttons';
import { Loader } from '../../../components/Loaders/Loader';
import { openModal } from '../../../store/slices/modalSlice';
import { MODAL_TYPES } from '../../../constants/modals';

export const MyCriptoPortfolioList = ({ cryptoAssetsInCurrency, cryptoCoins, isLoading }) => {
	const dispatch = useDispatch();

	const handleAddAsset = () => {
		dispatch(
			openModal({
				modalType: MODAL_TYPES.ADD_CRYPTO_ASSET,
				modalProps: { cryptoCoins },
			}),
		);
	};

	return (
		<section className="flex flex-col flex-3/12 p-4 rounded-3xl bg-sky-950/40">
			<div className="flex justify-between gap-2 mb-2">
				<SectionContainerHeader title={'Активы'} />
				<EditAddDeleteButton
					onClick={handleAddAsset}
					icon={AddIcon}
					title={'Добавить'}
					alt={'crypto coins'}
				/>
			</div>

			{isLoading ? (
				<div className="flex items-center justify-center h-full min-h-[30vh]">
					<Loader />
				</div>
			) : (
				<div className="flex flex-col gap-4 pr-2 w-full h-full max-h-[30vh] 3xl:max-h-[36vh] rounded-2xl overflow-y-auto overscroll-auto scroll-smooth scrollbar">
					{cryptoAssetsInCurrency?.length === 0 ? (
						<div className="flex items-center justify-center h-full text-slate-400">
							Портфель пуст
						</div>
					) : (
						cryptoAssetsInCurrency?.map((coin) => (
							<CryptoAssets
								key={coin.id}
								id={coin.id}
								averageBuyPrice={coin.averagePrice}
								assetsAmount={coin.assetAmount}
								coinPrice={coin.price}
								profit={coin.profit}
								profitPercentage={coin.profitPercentage}
								growValue={coin.growValue}
								coinTitle={coin.name}
								icon={coin.icon}
								symbol={coin.symbol}
								cryptoAssetsInCurrency={cryptoAssetsInCurrency}
							/>
						))
					)}
				</div>
			)}
		</section>
	);
};
