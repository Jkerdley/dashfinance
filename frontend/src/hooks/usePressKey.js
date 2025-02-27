import { useEffect, useState } from 'react';

export const usePressKey = (pressedKey) => {
	const [isKeyPressed, setIsKeyPressed] = useState(false);

	const onKeyDown = ({ key }) => {
		key === pressedKey && setIsKeyPressed(true);
	};
	const onKeyUp = ({ key }) => {
		key === pressedKey && setIsKeyPressed(false);
	};

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('keyup', onKeyUp);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('keyup', onKeyUp);
		};
	}, []);
	return isKeyPressed;
};
