import { BaseModal } from './base/BaseModal';
import { MenuButtonsContainer } from '../Sidebar/MenuButtonsContainer';
import { DayNightSwitcher } from '../Sidebar/DayNightSwitcher';

interface BurgerMenuModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const BurgerMenuModal = ({ isOpen, onClose }: BurgerMenuModalProps) => {
    return (
        <BaseModal isOpen={isOpen} onClose={onClose} width="w-[300px]" position="left">
            <div className="flex flex-col sticky top-20 py-4">
                <DayNightSwitcher isInModal={true} />
                <MenuButtonsContainer isMenuOpened={true} />
            </div>
        </BaseModal>
    );
};
