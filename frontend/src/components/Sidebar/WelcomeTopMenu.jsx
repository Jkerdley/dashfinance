import React from 'react';
import { useGetUserQuery } from '../../store/api/backendApi';

const formatLastLogin = (dateString) => {
	if (!dateString) return 'Неизвестно';
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('ru-RU').format(date);
};

export const WelcomeTopMenu = () => {
	const { data } = useGetUserQuery();
	const user = data?.user;

	const lastLoginDate = user?.lastLogin || new Date().toISOString();

	return (
		<div className="hidden items-end justify-center w-full xl:hidden 2xl:flex flex-5">
			<div className="flex flex-col items-center justify-center text-center text-gray-100/90">
				<p className="text-base font-semibold text-center uppercase">
					Welcome, {user?.name?.split(' ')[0] || 'User'}!
				</p>
				<p className="text-sm">
					Last login <br />
					<span className="font-medium">{formatLastLogin(lastLoginDate)}</span>
				</p>
			</div>
		</div>
	);
};
