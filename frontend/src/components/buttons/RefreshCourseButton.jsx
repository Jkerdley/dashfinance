import React, { useState } from 'react';
import { getCourseAction } from '../../store/actions/async/getCourseAction';
import { useDispatch } from 'react-redux';
import RefreshCourseIcon from '../../assets/icons/refresh-course-icon.svg';
import OutlineButton from './OutlineButton';
import { fetchCryptoData } from '../../store/actions/async';

export const RefreshCourseButton = ({ title, isCrypto }) => {
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const handleClickGetCourse = async () => {
		setIsLoading(true);
		try {
			await dispatch(getCourseAction());
			isCrypto && (await dispatch(fetchCryptoData()));
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<OutlineButton
			disabled={false}
			alt="refresh course"
			isLoader={true}
			isLoading={isLoading}
			icon={RefreshCourseIcon}
			onClick={handleClickGetCourse}
		>
			{title}
		</OutlineButton>
	);
};
