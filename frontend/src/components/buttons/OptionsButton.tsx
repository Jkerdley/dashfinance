import OptionsIcon from '../../assets/icons/options-icon.svg';
import DeleteIcon from '../../assets/icons/delete-icon.svg';

interface OptionsButtonProps {
    deleteIcon?: boolean;
    onClick: () => void;
    flex?: string;
    size?: number | string;
    disabled?: boolean;
}

export const OptionsButton = (props: OptionsButtonProps) => {
    const {
        deleteIcon,
        onClick,
        flex = '',
        size = 5,
        disabled = false
    } = props;

    return (
        <div className={`flex ${flex} justify-end shrink-0`}>
            <button
                onClick={onClick}
                disabled={disabled}
                className={`group flex h-9 w-9 p-1.5 justify-center items-center rounded-xl border-[1.2px]
                    transition-all duration-100 ease-in
                    ${disabled
                        ? 'opacity-50 cursor-not-allowed border-transparent'
                        : 'hover:border-white border-cyan-900/0 cursor-pointer'
                    }`}
            >
                <img
                    className={`h-${size}
                        ${deleteIcon ? 'group-hover:rotate-12 duration-150' : 'group-hover:rotate-y-180 duration-50'}
                        ${disabled ? '' : 'ease-in-out'}`}
                    src={deleteIcon ? DeleteIcon : OptionsIcon}
                    alt={deleteIcon ? "delete" : "options"}
                />
            </button>
        </div>
    );
};
