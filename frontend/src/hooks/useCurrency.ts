import { useAppSelector } from './reduxHooks';

interface UseCurrencyReturn {
	isUSD: boolean;
	rubleCourse: number | null;
}

export const useCurrency = (): UseCurrencyReturn => {
	const isUSD = useAppSelector((state) => state.currency.isUSD);
	const usdCourse = useAppSelector((state) => state.currency.usdCourse);

	return { isUSD, rubleCourse: usdCourse };
};
