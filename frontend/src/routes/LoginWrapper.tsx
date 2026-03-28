import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useGetUserQuery } from '../store/api/backendApi';
import { APP_ROUTES } from '../constants/routes';

interface LoginWrapperProps {
    children: ReactNode;
}

export const LoginWrapper = ({ children }: LoginWrapperProps) => {
    const { data: userData } = useGetUserQuery();
    const isAuthenticated = !!userData?.user;

    return isAuthenticated ? <Navigate to={APP_ROUTES.HOME} replace /> : children;
};
