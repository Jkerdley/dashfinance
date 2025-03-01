import { useDispatch, useSelector } from 'react-redux';
import { currencySelector, rubleCourseSelector } from '../store/selectors';
import { getHIstoryInCurrency } from '../utils/getHIstoryInCurrency';
import { getsortedHistory } from '../utils/getSortedHistory';
import { useEffect, useMemo } from 'react';

export const useFetchHistoryData = (asyncAction, sortType, dataSelector, isLoadingSelector) => {
	const isUSD = useSelector(currencySelector);
	const rubleCourse = useSelector(rubleCourseSelector);
	const dispatch = useDispatch();
	const fetchedHistory = useSelector(dataSelector);

	const fetchHistoryIsLoading = useSelector(isLoadingSelector);

	useEffect(() => {
		dispatch(asyncAction());
	}, []);

	const filteredHistory = useMemo(() => {
		return getHIstoryInCurrency(fetchedHistory, isUSD, rubleCourse);
	}, [isUSD, rubleCourse, fetchedHistory]);

	console.log('filteredHistory', filteredHistory);
	const sortedHistory = useMemo(() => {
		return getsortedHistory(filteredHistory, sortType);
	}, [filteredHistory, sortType]);
	return [sortedHistory, fetchHistoryIsLoading];
};
