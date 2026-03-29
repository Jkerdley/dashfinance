import OutlineButton from './OutlineButton';

interface EditAddDeleteButtonProps {
    onClick: () => void;
    alt: string;
    title: string;
    icon: string;
}

export const EditAddDeleteButton = ({ onClick, alt, title, icon }: EditAddDeleteButtonProps) => {
    return (
        <OutlineButton onClick={onClick} disabled={false} icon={icon} alt={alt}>
            <span className="flex-shrink overflow-hidden text-base truncate">{title}</span>
        </OutlineButton>
    );
};
