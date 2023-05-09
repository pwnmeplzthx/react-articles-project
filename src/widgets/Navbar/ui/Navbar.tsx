import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = (props: NavbarProps) => {

    const { className } = props

    return (
        <div className={classNames(cls.navbar, [className])}>
            <div className={cls.links}>
                <AppLink theme={AppLinkTheme.SECONDARY} className={cls.link} to={'/'}>
                    Главная
                </AppLink>
                <AppLink theme={AppLinkTheme.SECONDARY} className={cls.link} to={'/about'}>
                    О сайте
                </AppLink>
            </div>
        </div>
    )
}