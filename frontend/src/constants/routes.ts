export const APP_ROUTES = {
	HOME: '/',
	LOGIN: '/login',
	REGISTER: '/register',
	FINANCES: '/finances',
	CRYPTO: '/crypto',
	PROFILE: '/profile',
	SETTINGS: '/settings',
	INVESTMENTS: '/investments',
	ANALYTICS: '/analytics',
} as const;

export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
