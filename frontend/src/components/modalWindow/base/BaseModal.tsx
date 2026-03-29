import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { usePressKey } from '../../../hooks';
import { CloseModalButton } from '../../buttons';

type ModalPosition = 'left' | 'right' | 'center';

const POSITION_CLASSES: Record<ModalPosition, string> = {
    left: 'top-0 left-0 h-full rounded-r-4xl',
    right: 'top-0 right-0 h-full rounded-l-4xl',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-4xl',
};

interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    width?: string;
    position?: ModalPosition;
}

export const BaseModal = (props: BaseModalProps) => {
    const {
        isOpen,
        onClose,
        children,
        width = 'w-[48vw]',
        position = 'center'
    } = props;

    const modalRef = useRef<HTMLDivElement>(null);
    const escPressed = usePressKey('Escape');

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        if (escPressed && isOpen) {
            onClose();
        }
    }, [escPressed, isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            <div
                className="absolute inset-0 bg-gray-950/70 animate-in fade-in duration-300"
                onClick={onClose}
                aria-hidden="true"
            />

            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                className={`
                    absolute ${width} min-h-[20%] px-8 pt-10 pb-6 z-10
                    bg-sky-950/85 backdrop-blur-2xl text-center shadow-2xl
                    border border-white/10 transition-all duration-300 ease-out
                    ${POSITION_CLASSES[position]}
                    ${
                        position === 'center'
                            ? 'animate-in zoom-in-95 fade-in duration-300'
                            : 'animate-in slide-in-from-left duration-300'
                    }
                `}
            >
                <CloseModalButton onClick={onClose} />
                {children}
            </div>
        </div>
    );
};
