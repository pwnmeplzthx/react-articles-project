import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { HTMLAttributes, memo, ReactNode } from 'react';
import cls from './Card.module.scss';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
    CLEAR = 'clear'
}

// Добавляем дефолтные пропсы элементы extends HTMLAttributes<HTMLDivElement>
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    theme?: CardTheme;
    max?: boolean;
}

export const Card = memo((props: CardProps) => {
    const {
        className,
        children,
        theme = CardTheme.NORMAL,
        max,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.max]: max,
    };

    return (
        <div
            className={classNames(cls.сard, [className, cls[theme]], mods)}
            {...otherProps}
        >
            {children}
        </div>
    );
});
