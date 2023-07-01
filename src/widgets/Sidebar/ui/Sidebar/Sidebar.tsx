import { classNames } from 'shared/lib/classNames/classNames';
import ArrowLeftIcon from 'shared/assets/icons/arrow-left.svg';
import ArrowRightIcon from 'shared/assets/icons/arrow-right.svg';
import { memo, useMemo, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { ButtonSize } from 'shared/ui/Button/ui/Button';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { useSelector } from 'react-redux';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    const { theme, toggleTheme } = useTheme();
    const sidebarItemsList = useSelector(getSidebarItems);

    const itemsList = useMemo(() => sidebarItemsList.map((item) => (
        <SidebarItem
            item={item}
            collapsed={collapsed}
            key={item.path}
        />
    )), [collapsed, sidebarItemsList]);

    return (
        <div
            data-testid="sidebar"
            className={classNames(cls.sidebar, [className], { [cls.collapsed]: collapsed })}
        >
            <div className={cls.sideBarToggleWrapper}>
                <Button
                    data-testid="sidebar-toggle"
                    onClick={onToggle}
                    className={cls.collapseBtn}
                    theme={ButtonTheme.BACKGROUND}
                    // size={ButtonSize.XL}
                    square
                >
                    {collapsed
                        ? <ArrowRightIcon className={cls.strokeTogleButton} />
                        : <ArrowLeftIcon className={cls.strokeTogleButton} />}
                </Button>
            </div>
            <div className={cls.items}>
                {itemsList}
            </div>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher
                    short={collapsed}
                    className={cls.lang}
                />
            </div>
        </div>
    );
});
