import { useSelector } from 'react-redux';
import { currencySelector, rubleCourseSelector } from '../store/selectors';

export const useCurrency = () => {
	const isUSD = useSelector(currencySelector);
	const rubleCourse = useSelector(rubleCourseSelector);
	return { isUSD, rubleCourse };
};
