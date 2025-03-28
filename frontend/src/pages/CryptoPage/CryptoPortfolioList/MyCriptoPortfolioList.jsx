import React from 'react';
import AddIcon from '../../../assets/icons/add-icon.svg';
import { CryptoAssets } from './CryptoAssets';
import { OperationsPanel } from '../../../components/OperationsPanelButtons/OperationsPanel';
import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader';
import { EditAddDeleteButton } from '../../../components/buttons';
import { Loader } from '../../../components/Loaders/Loader';
import { useDispatch, useSelector } from 'react-redux';
import {
	closeAddCryptoAssetModal,
	closeUpdateCryptoAssetModal,
	openAddCryptoAssetModal,
} from '../../../store/actions';
import { selectAddCryptoAssetModal, selectUpdateCryptoAssetModal } from '../../../store/selectors';
import { AddCryptoAssetModal, UpdateCryptoAssetModal } from '../../../components/modalWindow';

export const MyCriptoPortfolioList = ({ cryptoAssetsInCurrency, cryptoCoins, isLoading }) => {
	const addCryptoAsset = useSelector(selectAddCryptoAssetModal);
	const updateCryptoAsset = useSelector(selectUpdateCryptoAssetModal);
	const dispatch = useDispatch();
	return (
		<section id="column__categories" className="flex flex-col flex-3/12 p-4 rounded-3xl bg-sky-950/40">
			<div id="categories__title-and-buitton" className="flex justify-between gap-2 mb-2">
				<SectionContainerHeader title={'Активы'} />
				<EditAddDeleteButton
					onClick={() => dispatch(openAddCryptoAssetModal())}
					icon={AddIcon}
					title={'Добавить'}
					alt={'crypto coins'}
				/>
			</div>
			{isLoading ? (
				<div className="flex flex-4/12 pr-2 justify-between 2xl:max-h-[36vh] min-w-[22vw] w-full h-full">
					<Loader />
				</div>
			) : (
				<div
					id="spend-categories__container"
					className="flex flex-4/12 flex-wrap gap-4 pr-2 justify-between 3xl:max-h-[36vh] max-h-[30vh] w-full h-full rounded-2xl overflow-y-auto overscroll-auto scroll-smooth scrollbar"
				>
					{addCryptoAsset.isOpen && (
						<AddCryptoAssetModal
							cryptoCoins={cryptoCoins}
							isOpen={addCryptoAsset.isOpen}
							onClose={() => dispatch(closeAddCryptoAssetModal())}
						/>
					)}
					{updateCryptoAsset.isOpen && (
						<UpdateCryptoAssetModal
							cryptoAssetsInCurrency={cryptoAssetsInCurrency}
							assetId={updateCryptoAsset.cryptoAssetIdForUpdate}
							isOpen={updateCryptoAsset.isOpen}
							onClose={() => dispatch(closeUpdateCryptoAssetModal())}
						/>
					)}

					{cryptoAssetsInCurrency.map((coin) => {
						return (
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
							/>
						);
					})}
				</div>
			)}

			{/* <OperationsPanel isCrypto={true} /> */}
		</section>
	);
};
