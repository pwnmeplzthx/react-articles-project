import { FC, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher'

interface SidebarProps {
    className?: string
}

export const Sidebar: FC<SidebarProps> = (props) => {

    const [collapsed, setCollapsed] = useState(false)

    const {className} = props

    const toggleCollapsed = () => {
        setCollapsed(prev => !prev)
    }

    return (
        <div className={classNames(cls.sidebar, [className], {[cls.collapsed]: collapsed})}>
            <button onClick={toggleCollapsed}>toggle</button>
            <div className={cls.switchers}>
                <ThemeSwitcher />
            </div>
        </div>
    )
}