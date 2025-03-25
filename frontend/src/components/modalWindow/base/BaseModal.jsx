import React, { useEffect, useRef, useState } from 'react';
import { usePressKey } from '../../../hooks';
import { CloseModalButton } from '../../buttons';

export const BaseModal = ({ isOpen, onClose, children, width = 'w-[48vw]', position = 'center' }) => {
	const modalRef = useRef(null);
	const escButtonPressed = usePressKey('Escape');
	const [isVisible, setIsVisible] = useState(false);

	const handleClose = () => {
		setIsVisible(false);
		setTimeout(() => {
			onClose();
		}, 200);
	};

	useEffect(() => {
		if (isOpen) {
			setIsVisible(true);
		}
	}, [isOpen]);

	useEffect(() => {
		if (escButtonPressed && isOpen) {
			handleClose();
		}
	}, [escButtonPressed, isOpen]);

	if (!isOpen) return null;

	const positionClasses = {
		left: 'left-0 top-0 h-full',
		right: 'right-0 top-0 h-full',
		center: 'top-1/2 left-1/2',
	};

	const animationClasses = {
		left: isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0',
		right: isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
		center: isVisible
			? 'translate-x-[-50%] translate-y-[-50%] opacity-100 scale-100'
			: 'translate-x-[-50%] translate-y-[-60%] opacity-0 scale-55',
	};

	return (
		<section className="fixed inset-0 z-20">
			<div
				className={`
                    absolute w-full h-full bg-gray-950/70 transition-opacity duration-200 ease-in-out
                    ${isVisible ? 'opacity-100' : 'opacity-0'}
                `}
				onClick={handleClose}
			/>
			<div
				ref={modalRef}
				tabIndex="-1"
				className={`
                    relative ${width} h-auto min-h-1/5 px-8 pt-6 z-30
                 bg-sky-950/50 backdrop-blur-xl rounded-4xl text-center
                    ${positionClasses[position]}
                    ${animationClasses[position]}
                    transition-all duration-200 ease-in-out
                `}
			>
				<CloseModalButton onClick={handleClose} />
				{children}
			</div>
		</section>
	);
};
