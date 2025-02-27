import React, { useState } from 'react';
import { getCourseAction } from '../../store/actions/getCourseAction';
import { useDispatch } from 'react-redux';
import RefreshCourseIcon from '../../assets/icons/refresh-course-icon.svg';
import OutlineButton from './OutlineButton';

export const RefreshCourseButton = () => {
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const handleClickGetCourse = async () => {
		setIsLoading(true);
		try {
			await dispatch(getCourseAction());
			await new Promise((resolve) => setTimeout(resolve, 1000));
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
			Обновить курс
		</OutlineButton>
	);
};
