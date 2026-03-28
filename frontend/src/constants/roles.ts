export const ROLES = {
	ADMIN: 0,
	USER: 1,
	GUEST: 2,
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
