import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import ThemeIcon from 'shared/assets/icons/icons8-sun.svg';
import { Button, ThemeButton } from 'shared/ui/Button';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = (props) => {
    const { className } = props;

    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ThemeButton.CLEAR}
            onClick={toggleTheme}
            className={classNames('', [className])}
        >
            {theme === Theme.DARK
                ? <ThemeIcon className={cls.light} />
                : <ThemeIcon className={cls.dark} />}
        </Button>
    );
};
