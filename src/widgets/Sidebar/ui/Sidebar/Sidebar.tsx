import { FC, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher';
import { Button } from 'shared/ui/Button';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string
}

export const Sidebar: FC<SidebarProps> = (props) => {
    const [collapsed, setCollapsed] = useState(false);

    const { className } = props;

    const toggleCollapsed = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <div className={classNames(cls.sidebar, [className], { [cls.collapsed]: collapsed })}>
            <Button
                onClick={toggleCollapsed}
            >
                toggle
            </Button>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={cls.lang} />
            </div>
        </div>
    );
};
