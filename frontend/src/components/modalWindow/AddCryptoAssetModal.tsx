import { useCallback, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useAddCryptoAssetMutation } from '../../store/api/backendApi';
import { BaseModal } from './base/BaseModal';
import { debounce } from '../../utils';
import { CryptoAssetForm } from './forms';

interface CryptoCoin {
    id: string;
    name: string;
    symbol: string;
    icon: string;
}

interface AddCryptoAssetModalProps {
    isOpen: boolean;
    onClose: () => void;
    cryptoCoins?: CryptoCoin[];
}

export const AddCryptoAssetModal = ({ isOpen, onClose, cryptoCoins }: AddCryptoAssetModalProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<CryptoCoin[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [error, setError] = useState('');
    const [addCryptoAsset] = useAddCryptoAssetMutation();
    const [formData, setFormData] = useState({
        name: '',
        coinId: '',
        symbol: '',
        averagePrice: 0,
        totalSumm: 0,
        assetAmount: 0,
        history: [],
        icon: '',
    });

    const debouncedSearch = useCallback(
        debounce((inputTerm: string) => {
            if (!cryptoCoins) return;
            const results = cryptoCoins
                .filter(
                    (coin) =>
                        coin.name.toLowerCase().includes(inputTerm.toLowerCase()) ||
                        coin.symbol.toLowerCase().includes(inputTerm.toLowerCase()),
                )
                .slice(0, 20);
            setSearchResults(results);
            setShowDropdown(results.length > 0);
        }, 500),
        [cryptoCoins],
    );

    const handleFindCrypto = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        setError('');
        debouncedSearch(value);
    };

    const handleSelectCoin = (coin: CryptoCoin) => {
        setFormData({ ...formData, name: coin.name, coinId: coin.id, symbol: coin.symbol, icon: coin.icon });
        setShowDropdown(false);
        setSearchTerm(coin.name);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name) return alert('Нужно выбрать криптовалюту');

        try {
            await addCryptoAsset(formData).unwrap();
            onClose();
        } catch (err: any) {
            setError(err.data?.error || err.message);
        }
    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} width="md:w-[60vw] w-[90vw]" position="center">
            <div className="flex flex-col p-6 h-full w-full">
                <CryptoAssetForm
                    formData={formData}
                    searchTerm={searchTerm}
                    handleSubmit={handleSubmit}
                    error={error}
                    onClose={onClose}
                    handleFindCrypto={handleFindCrypto}
                    handleSelectCoin={handleSelectCoin}
                    searchResults={searchResults}
                    showDropdown={showDropdown}
                />
            </div>
        </BaseModal>
    );
};
