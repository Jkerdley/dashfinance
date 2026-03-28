interface CardIconProps {
    icon?: string | null;
    noBackground?: boolean;
    size?: number | string;
    buttonSize?: number | string;
    padding?: string;
}

export const CardIcon = (props: CardIconProps) => {
    const {
        icon,
        noBackground,
        size = 6,
        buttonSize = 11,
        padding = ''
    } = props;

    const background = noBackground ? '' : 'bg-sky-950';

    return (
        <div
            className={`flex shrink-0 w-10 h-10 md:w-${buttonSize} md:h-${buttonSize} ${padding} justify-center items-center rounded-xl ${background} ${noBackground ? '' : 'cursor-default'}`}
        >
            <img className={`rounded-md h-${size} w-${size}`} src={icon} alt="card icon" />
        </div>
    );
};
