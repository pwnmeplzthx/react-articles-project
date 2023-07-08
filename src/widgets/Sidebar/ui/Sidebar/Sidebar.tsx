import { useTheme } from 'app/providers/ThemeProvider';
import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import ArrowLeftIcon from 'shared/assets/icons/arrow-left.svg';
import ArrowRightIcon from 'shared/assets/icons/arrow-right.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { VStack } from 'shared/ui/Stack';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';

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
        <aside
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
            {/* role="navigation" - для сео-оптимизации */}
            <VStack role="navigation" gap="16" className={cls.items}>
                {itemsList}
            </VStack>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher
                    short={collapsed}
                    className={cls.lang}
                />
            </div>
        </aside>
    );
});
