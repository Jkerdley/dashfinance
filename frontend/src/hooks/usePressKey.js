import { useEffect, useState, useCallback } from 'react';

export const usePressKey = (pressedKey) => {
	const [isKeyPressed, setIsKeyPressed] = useState(false);

	const onKeyDown = useCallback(
		({ key }) => {
			if (key === pressedKey) {
				setIsKeyPressed(true);
			}
		},
		[pressedKey],
	);

	const onKeyUp = useCallback(
		({ key }) => {
			if (key === pressedKey) {
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
