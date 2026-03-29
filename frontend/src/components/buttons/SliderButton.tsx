interface MenuSliderButtonProps {
    icon: string;
    alt: string;
    disabled?: boolean;
    onClick?: () => void;
    value?: boolean;
    width?: string;
    padding?: string;
}

export const MenuSliderButton = (props: MenuSliderButtonProps) => {
    const {
        icon,
        alt,
        disabled = false,
        onClick,
        value = false,
        width = 'w-11',
        padding = 'p-2'
    } = props;

    if (disabled) {
        return (
            <button
                disabled
                className={`flex ${width} h-11 ${padding} justify-center items-center bg-gray-400 rounded-2xl transition-all duration-200 cursor-not-allowed`}
            >
                <img className="h-6 opacity-60" src={icon} alt={alt} />
            </button>
        );
    }

    return (
        <button
            onClick={onClick}
            className={`flex ${width} h-11 ${padding} gap-2 justify-center items-center hover:scale-x-110 bg-btn-color transition-all duration-200 rounded-2xl cursor-pointer overflow-hidden`}
        >
            <img
                className={`h-6 shrink-0 transition-transform duration-300 ${value ? 'rotate-180' : 'rotate-0'}`}
                src={icon}
                alt={alt}
            />
        </button>
    );
};
