import { FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ThemeSwitcher.module.scss'
import { Theme, useTheme } from 'app/providers/ThemeProvider'
import ThemeIcon from 'shared/assets/icons/icons8-sun.svg'
import { Button, ThemeButton } from 'shared/ui/Button'

interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = (props) => {

    const {className, children} = props

    const {theme, toggleTheme} = useTheme()

    return (
        <Button
            theme={ThemeButton.CLEAR}
            onClick={toggleTheme} 
            className={classNames(cls.button, [className])}
        >
            {theme === Theme.DARK 
                ? <ThemeIcon className={cls.light}/> 
                : <ThemeIcon className={cls.dark}/>
            }
        </Button>
    )
}