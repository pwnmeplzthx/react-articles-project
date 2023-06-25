import { classNames } from 'shared/lib/classNames/classNames';
import { HTMLAttributes, memo, ReactNode } from 'react';
import cls from './Card.module.scss';

// Добавляем дефолтные пропсы элементы extends HTMLAttributes<HTMLDivElement>
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
}

export const Card = memo((props: CardProps) => {
    const { className, children, ...otherProps } = props;

    return (
        <div
            className={classNames(cls.сard, [className])}
            {...otherProps}
        >
            {children}
        </div>
    );
});
