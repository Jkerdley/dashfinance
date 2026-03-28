import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { SidebarMenu } from './components/Sidebar';
import { TopMenuRow } from './components/TopMenu';
import { ModalManager } from './components/modalWindow/ModalManager';
import { CryptoLayout } from './pages/CryptoPage';
import { FinancesLayout } from './pages/FinancesPage';
import { useGetUserQuery } from './store/api/backendApi.ts';
import { MainPageLayout } from './pages/MainPage/MainPageLayout';
import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { LoginWrapper } from './routes/LoginWrapper';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { Loader } from './components/Loaders/Loader';
import { APP_ROUTES } from './constants/routes';
import { THEME_CLASSES } from './constants/theme';
import { useAppSelector } from './hooks/reduxHooks';

export const App = () => {
	const isDayTheme = useAppSelector((state) => state.theme.isDayTheme);
    const { isLoading: isUserFetching } = useGetUserQuery();

    useEffect(() => {
        document.body.className = isDayTheme ? THEME_CLASSES.DAY : THEME_CLASSES.NIGHT;
    }, [isDayTheme]);

    if (isUserFetching) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader />
            </div>
        );
    }

	return (
		<div className="flex bg-cover w-full overflow-x-hidden min-h-screen p-4">
			<Routes>
				<Route
					path={APP_ROUTES.LOGIN}
					element={
						<LoginWrapper>
							<LoginPage />
						</LoginWrapper>
					}
				/>
				<Route
					path={APP_ROUTES.REGISTER}
					element={
						<LoginWrapper>
							<RegisterPage />
						</LoginWrapper>
					}
				/>

				<Route
					path="/*"
					element={
						<ProtectedRoute>
							<ModalManager />

							<SidebarMenu />
							<div className="flex flex-col flex-15 p-4 gap-4 rounded-4xl bg-sky-300/5">
								<TopMenuRow />
								<div className="flex flex-wrap rounded-[36px] h-full gap-4">
									<Routes>
										<Route path={APP_ROUTES.HOME} element={<MainPageLayout />} />
										<Route path={APP_ROUTES.FINANCES} element={<FinancesLayout />} />
										<Route path={APP_ROUTES.CRYPTO} element={<CryptoLayout />} />
										<Route path="*" element={<Navigate to={APP_ROUTES.HOME} replace />} />
									</Routes>
								</div>
							</div>
						</ProtectedRoute>
					}
				/>
			</Routes>
		</div>
	);
};
