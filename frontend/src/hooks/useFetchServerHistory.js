import { useDispatch, useSelector } from 'react-redux';
import { getHIstoryInCurrency } from '../utils/getHIstoryInCurrency';
import { getsortedHistory } from '../utils/getSortedHistory';
import { useEffect, useMemo } from 'react';
import { useCurrency } from './useCurrency';

export const useFetchHistoryData = (asyncAction, sortType, dataSelector, isLoadingSelector) => {
	const { isUSD, rubleCourse } = useCurrency();
	const dispatch = useDispatch();
	const fetchedHistory = useSelector(dataSelector);

	const fetchHistoryIsLoading = useSelector(isLoadingSelector);

	useEffect(() => {
		dispatch(asyncAction());
	}, []);

	const filteredHistory = useMemo(() => {
		return getHIstoryInCurrency(fetchedHistory, isUSD, rubleCourse);
	}, [isUSD, rubleCourse, fetchedHistory]);

	const sortedHistory = useMemo(() => {
		return getsortedHistory(filteredHistory, sortType);
	}, [filteredHistory, sortType]);

	return [sortedHistory, fetchHistoryIsLoading];
};
