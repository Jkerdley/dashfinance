import { useEffect, useState, useCallback } from 'react';

export const usePressKey = (pressedKey: string): boolean => {
	const [isKeyPressed, setIsKeyPressed] = useState<boolean>(false);

	const onKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === pressedKey) {
				setIsKeyPressed(true);
			}
		},
		[pressedKey],
	);

	const onKeyUp = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === pressedKey) {
				setIsKeyPressed(false);
			}
		},
		[pressedKey],
	);

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('keyup', onKeyUp);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('keyup', onKeyUp);
			setIsKeyPressed(false);
		};
	}, [onKeyDown, onKeyUp]);

	return isKeyPressed;
};
