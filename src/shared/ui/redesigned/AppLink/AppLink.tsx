import { LinkProps, NavLink } from 'react-router-dom';
import {
    ForwardedRef, forwardRef, memo, ReactNode,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
    children?: any;
    activeClassName?: string;
}

export const AppLink = forwardRef((props: AppLinkProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
        to,
        className,
        children,
        variant = 'primary',
        activeClassName = '',
        ...otherProps
    } = props;

    return (
        <NavLink
            to={to}
            className={({ isActive }) => classNames(
                cls.AppLink,
                [
                    className,
                    cls[variant],
                ],
                { [activeClassName]: isActive },
            )}
            {...otherProps}
        >
            {children}
        </NavLink>
    );
});
