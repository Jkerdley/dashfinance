import { WideOperationsButton } from "../buttons";

interface CryptoPanelButtonsProps {
    handleOperationClick: (type: 'add' | 'spend') => void;
}

export const CryptoPanelButtons = (props: CryptoPanelButtonsProps) => {
    const { handleOperationClick } = props;

    return (
        <section id="operations__buttons" className="flex flex-col mt-4 items-start gap-4">
            <div className="flex gap-4 w-full justify-between items-center">
                <WideOperationsButton
                    onClick={() => handleOperationClick('add')}
                    color="bg-main-green"
                    alt="Купить"
                >
                    <span className="text-lg font-semibold">Покупка +</span>
                </WideOperationsButton>

                <WideOperationsButton
                    onClick={() => handleOperationClick('spend')}
                    color="bg-main-red"
                    alt="Продать"
                >
                    <span className="text-lg font-semibold">Продажа - </span>
                </WideOperationsButton>
            </div>
        </section>
    );
};
