import { memo } from 'react';
import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import ThemeIcon from '@/shared/assets/icons/icons8-sun.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
    const { className } = props;

    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ButtonTheme.CLEAR_INVERTED}
            onClick={toggleTheme}
            className={classNames('', [className])}
        >
            {theme === Theme.DARK
                ? <ThemeIcon className={cls.light} />
                : <ThemeIcon className={cls.dark} />}
        </Button>
    );
});
