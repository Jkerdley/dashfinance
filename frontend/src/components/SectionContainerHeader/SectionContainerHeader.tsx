interface SectionContainerHeaderProps {
    title: string;
}

export const SectionContainerHeader = (props: SectionContainerHeaderProps) => {
    const { title } = props;

    return (
        <span className="text-lg lg:text-xl font-medium overflow-hidden truncate whitespace-nowrap max-w-xs overflow-ellipsis">
            {title}
        </span>
    );
};
