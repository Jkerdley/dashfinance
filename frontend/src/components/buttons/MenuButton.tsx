import { NavLink } from 'react-router-dom';

interface MenuButtonProps {
    icon: string;
    alt: string;
    to: string;
    width: string;
    disabled?: boolean;
    buttonText?: string;
    isWide?: boolean;
}

export const MenuButton = (props: MenuButtonProps) => {
    const { icon, alt, disabled = false, to, width, buttonText, isWide } = props;

    if (disabled) {
        return (
            <button
                disabled
                type="button"
                className={`flex ${width} h-11 p-2 justify-center items-center bg-gray-400 rounded-2xl transition-all duration-200 cursor-not-allowed`}
            >
                <img className="h-6 opacity-60" src={icon} alt={alt} />
            </button>
        );
    }

    return (
        <NavLink
            to={to}
            className={({ isActive }) => `
                group flex ${width} h-11 p-2 gap-2 justify-center items-center
                ${isWide ? 'hover:scale-x-105' : ''} hover:bg-btn-menuhover
                ${isActive ? 'bg-transparent border-2 border-white' : 'bg-btn-color border-none'}
                transition-all duration-200 rounded-2xl cursor-pointer overflow-hidden
            `}
        >
            <img
                className={`h-6 shrink-0 ${isWide ? '' : 'group-hover:scale-110 transition-all duration-150 ease-in-out'}`}
                src={icon}
                alt={alt}
            />
            {width === 'w-48' && (
                <span className="opacity-0 animate-fadeIn whitespace-nowrap">{buttonText}</span>
            )}
        </NavLink>
    );
};
