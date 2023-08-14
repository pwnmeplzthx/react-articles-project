import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './ThemeButtonSwitcher.module.scss';

interface ThemeButtonSwitcherProps {
    className?: string
    themeSwitch: Theme
}

export const ThemeButtonSwitcher = memo((props: ThemeButtonSwitcherProps) => {
    const { className, themeSwitch } = props;

    const { theme, changeTheme } = useTheme();
    const { t } = useTranslation();

    const content = (themeSwitch: Theme) => {
        switch (themeSwitch) {
        case Theme.DARK:
            return (
                <div className={cls.switcherWrapper}>
                    <span className={cls.dark} />
                    {/* <Text text={t('Темная тема')} /> */}
                    {t('Темная тема')}
                </div>
            );
        case Theme.LIGHT:
            return (
                <div className={cls.switcherWrapper}>
                    <span className={cls.light} />
                    {/* <Text text={t('Светлая тема')} /> */}
                    {t('Светлая тема')}
                </div>
            );
        case Theme.KANAGAWA:
            return (
                <div className={cls.switcherWrapper}>
                    <span className={cls.kanagawa} />
                    {/* <Text text={t('Для эстетов')} /> */}
                    {t('Для эстетов')}
                </div>
            );
        default:
            return (
                null
            );
        }
    };

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            onClick={() => changeTheme(themeSwitch)}
            className={classNames('', [className])}
        >
            {content(themeSwitch)}
        </Button>
    );
});
