import type { ReactNode } from 'react';

interface WideOperationsButtonProps {
    disabled?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    icon?: string;
    alt?: string;
    children: ReactNode;
    color?: string;
}

export const WideOperationsButton = (props: WideOperationsButtonProps) => {
    const {
        disabled = false,
        onClick,
        type = 'button',
        icon,
        alt = 'icon',
        children,
        color = 'bg-gray-200'
    } = props;

    if (disabled) {
        return (
            <button
                disabled={true}
                className="flex justify-center items-center rounded-xl w-[46%] h-10 text-gray-500 bg-gray-500 cursor-not-allowed p-2"
            >
                {children}
            </button>
        );
    }

    return (
        <button
            onClick={onClick}
            type={type}
            id="button--wide-operation"
            className={`flex justify-center items-center rounded-xl min-w-32 w-[44%] h-10 ${color} cursor-pointer text-black transition-all duration-200 ease hover:opacity-70`}
        >
            {children}
            {icon ? <img className="h-6" src={icon} alt={alt} /> : null}
        </button>
    );
};
