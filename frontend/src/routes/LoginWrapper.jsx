import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../store/selectors';

export const LoginWrapper = ({ children }) => {
	const isAuthenticated = useSelector(selectIsAuthenticated);
	return isAuthenticated ? <Navigate to="/" replace /> : children;
};
