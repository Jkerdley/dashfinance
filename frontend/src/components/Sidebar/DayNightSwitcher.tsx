import { toggleTheme } from '../../store/slices/themeSlice';
import { Button } from '../buttons/Button';
import DayTheme from '../../assets/icons/day-icon.svg';
import NightTheme from '../../assets/icons/night-icon.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

interface DayNightSwitcherProps {
    isInModal?: boolean;
}

export const DayNightSwitcher = ({ isInModal }: DayNightSwitcherProps) => {
    const dispatch = useAppDispatch();
    const isDayTheme = useAppSelector((state) => state.theme.isDayTheme);

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    return (
        <div id="theme-switcher__container" className="flex flex-col items-center justify-end flex-2">
            <div
                id="theme-switcher__buttons"
                className="flex items-center justify-center p-1.5 gap-2 rounded-2xl bg-gray-500/25"
            >
                <Button alt="DayTheme" icon={DayTheme} onClick={handleToggleTheme} disabled={isDayTheme} />
                <Button
                    alt="NightTheme"
                    icon={NightTheme}
                    onClick={handleToggleTheme}
                    disabled={!isDayTheme}
                />
            </div>
        </div>
    );
};
