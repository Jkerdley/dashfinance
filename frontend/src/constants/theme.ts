export const THEME_CLASSES = {
	DAY: 'body-day scrollbar',
	NIGHT: 'body-night scrollbar',
} as const;

export type ThemeClass = (typeof THEME_CLASSES)[keyof typeof THEME_CLASSES];
