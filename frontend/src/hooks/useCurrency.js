import { useSelector } from 'react-redux';

export const useCurrency = () => {
	const isUSD = useSelector((state) => state.currency.isUSD);
	const rubleCourse = useSelector((state) => state.currency.usdCourse);
	return { isUSD, rubleCourse };
};
