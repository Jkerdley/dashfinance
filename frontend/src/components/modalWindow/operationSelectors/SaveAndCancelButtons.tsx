import { WideOperationsButton } from '../../buttons';

interface SaveAndCancelButtonsProps {
    onClose: () => void;
    mainTitle?: string;
}

export const SaveAndCancelButtons = ({ onClose, mainTitle }: SaveAndCancelButtonsProps) => {
    return (
        <section id="save-and-cancel__buttons" className="flex px-20 justify-evenly mb-6 gap-4">
            <WideOperationsButton
                type="submit"
                color="bg-main-green"
                alt="Сохранить"
            >
                <span className="text-lg font-semibold">{mainTitle || 'Сохранить'} </span>
            </WideOperationsButton>
            <WideOperationsButton type="button" onClick={onClose} color="bg-main-red" alt="Отмена">
                <span className="text-lg font-semibold">Отмена</span>
            </WideOperationsButton>
        </section>
    );
};
