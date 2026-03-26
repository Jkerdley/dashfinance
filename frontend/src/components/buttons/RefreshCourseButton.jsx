import React from 'react';
import { useGetCurrencyRatesQuery, useGetCryptoCoinsQuery } from '../../store/api/externalApi';
import RefreshCourseIcon from '../../assets/icons/refresh-course-icon.svg';
import OutlineButton from './OutlineButton';

export const RefreshCourseButton = ({ title, isCrypto }) => {
	const { refetch: refetchCurrency, isFetching: isCurrencyFetching } = useGetCurrencyRatesQuery();
	const { refetch: refetchCrypto, isFetching: isCryptoFetching } = useGetCryptoCoinsQuery();
	
	const isLoading = isCurrencyFetching || (isCrypto && isCryptoFetching);

	const handleClickGetCourse = async () => {
		try {
			await refetchCurrency();
			if (isCrypto) {
				await refetchCrypto();
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<OutlineButton
			disabled={false}
			alt="Обновить курс"
			isLoader={true}
			isLoading={isLoading}
			icon={RefreshCourseIcon}
			onClick={handleClickGetCourse}
		>
			{title}
		</OutlineButton>
	);
};
