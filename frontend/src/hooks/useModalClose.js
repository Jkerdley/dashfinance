import { useCallback, useState } from 'react';

export const useModalClose = (onClose, delay = 400) => {
	const [isVisible, setIsVisible] = useState(true);

	const handleClose = useCallback(() => {
		setIsVisible(false);
		setTimeout(() => {
			onClose();
		}, delay);
	}, [onClose, delay]);

	return { handleClose, isVisible, setIsVisible };
};
