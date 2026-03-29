import { useState } from 'react';
import { useDeleteEntireCryptoAssetMutation } from '../../store/api/backendApi';
import { BaseModal } from './base/BaseModal';
import { CryptoAssetUpdate } from './forms';
import DeleteIcon from '../../assets/icons/delete-icon.svg';
import OutlineButton from '../buttons/OutlineButton';
import { useFetchCryptoAssetsInCurrency } from '../../hooks';

interface UpdateCryptoAssetModalProps {
    assetId: string;
    isOpen: boolean;
    onClose: () => void;
}

export const UpdateCryptoAssetModal = ({ assetId, isOpen, onClose }: UpdateCryptoAssetModalProps) => {
    const [error, setError] = useState('');
    const [deleteEntireAsset] = useDeleteEntireCryptoAssetMutation();

    const { cryptoAssetsInCurrency, isLoading } = useFetchCryptoAssetsInCurrency();
    const selectedAsset = cryptoAssetsInCurrency.find((asset) => asset.id === assetId);

    const handleDeleteAsset = async () => {
        if (window.confirm('Вы уверены что хотите удалить криптоактив?')) {
            try {
                if (selectedAsset) {
                    await deleteEntireAsset(selectedAsset.id).unwrap();
                    onClose();
                }
            } catch (error: any) {
                setError(error.data?.error || error.message || 'Ошибка удаления');
                console.error('Ошибка при удалении криптоактива', error);
            }
        }
    };

    if (isLoading || !selectedAsset) return null;

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} width="md:w-[60vw] w-[90vw]" position="center">
            <section className="flex flex-col justify-center p-4 h-full w-full">
                <CryptoAssetUpdate selectedAsset={selectedAsset as any} error={error} onClose={onClose} />
                <div className="flex justify-center mb-4 mt-4">
                    <OutlineButton icon={DeleteIcon} onClick={handleDeleteAsset}>
                        Удалить актив
                    </OutlineButton>
                </div>
            </section>
        </BaseModal>
    );
};
