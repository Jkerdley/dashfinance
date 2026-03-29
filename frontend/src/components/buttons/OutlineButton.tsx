import { ReactNode } from 'react';
interface OutlineButtonProps {
    disabled?: boolean;
    onClick?: () => void;
    icon?: string;
    children: ReactNode;
    isLoader?: boolean;
    isLoading?: boolean;
    alt?: string;
}

const OutlineButton = (props: OutlineButtonProps) => {
    const {
        disabled = false,
        onClick,
        icon,
        children,
        isLoader = false,
        isLoading = false,
        alt = "icon"
    } = props;

    if (disabled) {
        return (
            <button
                disabled={true}
                className="cursor-default flex justify-center items-center rounded-xl w-auto px-4 h-9 border border-zinc-400 text-zinc-400 gap-2"
            >
                {children}
                {icon ? <img className="h-5 opacity-45" src={icon} alt={alt} /> : null}
            </button>
        );
    }

    return (
        <button
            onClick={onClick}
            className="group flex justify-center items-center rounded-xl w-auto px-4 h-9 border border-white transition-all duration-150 ease-in-out cursor-pointer gap-2 hover:bg-sky-800/60 hover:border-cyan-900/10"
        >
            <div className="flex truncate md:text-md text-sm items-center">{children}</div>
            {icon ? (
                <img
                    className={`h-5 transition-all ${isLoader && isLoading ? 'animate-spin-custom' : 'group-hover:rotate-12'} duration-150 ease-in-out fill-red-50`}
                    src={icon}
                    alt={alt}
                />
            ) : null}
        </button>
    );
};

export default OutlineButton;
