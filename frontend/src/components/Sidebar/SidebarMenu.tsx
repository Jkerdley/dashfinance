import { useState } from 'react';
import { MenuButtonsContainer } from './MenuButtonsContainer';
import { WelcomeTopMenu } from './WelcomeTopMenu';
import { DayNightSwitcher } from './DayNightSwitcher';
import SlideRight from '../../assets/icons/slider-right-icon.svg';
import { MenuSliderButton } from '../buttons';

export const SidebarMenu = () => {
    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

    const onButtonClick = () => {
        setIsMenuOpened((prev) => !prev);
    };

    const flexClass = isMenuOpened ? 'flex-2' : 'flex-1';

    return (
        <aside
            id="side-menu-wrapper"
            className={`hidden lg:hidden 2xl:flex flex-col ${flexClass} items-center justify-between content-between px-2 pb-4 mr-4 transition-all duration-250 ease-in-out rounded-3xl`}
        >
            <div className="flex items-center justify-center flex-1 transition-all duration-250">
                <MenuSliderButton
                    padding="px-3"
                    width="w-11"
                    value={isMenuOpened}
                    onClick={onButtonClick}
                    alt="slide"
                    icon={SlideRight}
                />
            </div>

            <MenuButtonsContainer isMenuOpened={isMenuOpened} />

            <div className="hidden flex-col gap-6 xl:hidden 2xl:flex">
                <WelcomeTopMenu />
                <DayNightSwitcher />
            </div>
        </aside>
    );
};
