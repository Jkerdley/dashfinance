import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../store/selectors';

export const ProtectedRoute = ({ children }) => {
	const isAuthenticated = useSelector(selectIsAuthenticated);
	return isAuthenticated ? children : <Navigate to="/login" replace />;
};
