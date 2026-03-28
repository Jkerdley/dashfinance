import type { ReactNode } from 'react';

interface ButtonProps {
    icon?: string;
    alt: string;
    disabled?: boolean;
    onClick?: () => void;
    children?: ReactNode;
    padding?: string;
    width?: string;
}

export const Button = (props: ButtonProps) => {
    const {
        icon,
        alt,
        disabled = false,
        onClick,
        children,
        padding = '',
        width = 'w-9'
    } = props;

    if (disabled) {
        return (
            <button
                disabled
                className={`flex ${width} h-9 ${padding} justify-center items-center bg-gray-400 rounded-xl cursor-not-allowed`}
            >
                {icon && <img className="h-6 opacity-60" src={icon} alt={alt} />}
                {children}
            </button>
        );
    }

    return (
        <button
            onClick={onClick}
            className={`group flex ${width} h-9 ${padding} justify-center items-center transition-all ease-in-out duration-100 rounded-xl cursor-pointer bg-btn-color hover:bg-btn-hovercolor truncate`}
        >
            {children}
            {icon && (
                <img
                    className="h-6 group-hover:rotate-12 transition-all duration-150 ease-in-out"
                    src={icon}
                    alt={alt}
                />
            )}
        </button>
    );
};
