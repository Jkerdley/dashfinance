import { useEffect, useState } from 'react';

export const usePressKey = (targetKey) => {
	const [keyIsPressed, setKeyUsPressed] = useState(false);

	const onKeyDown = ({ key }) => {
		key === targetKey && setKeyUsPressed(true);
	};
	const onKeyUp = ({ key }) => {
		key === targetKey && setKeyUsPressed(false);
	};

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('keyup', onKeyUp);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('keyup', onKeyUp);
		};
	}, []);
	return keyIsPressed;
};
