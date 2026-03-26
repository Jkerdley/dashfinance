import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGetUserQuery } from '../store/api/backendApi';
import { APP_ROUTES } from '../constants/routes';

export const LoginWrapper = ({ children }) => {
	const { data: userData } = useGetUserQuery();
	const isAuthenticated = !!userData?.user;

	return isAuthenticated ? <Navigate to={APP_ROUTES.HOME} replace /> : children;
};
