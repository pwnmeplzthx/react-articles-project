import React from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StatusBadge.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';

export type BadgeColor = 'normal' | 'success' | 'error' | 'warning';
export type BadgeSize = 'm' | 'l' | 'xl';

type StatusBadgeProps = {
    className?: string;
    status: BadgeColor;
    text: string;
    size?: BadgeSize;
}

export function StatusBadge(props: StatusBadgeProps) {
    const {
        className,
        status,
        text,
        size = 'm',
    } = props;

    return (
        <span
            className={classNames(cls.statusBadge, [
                className,
                cls[status],
                cls[size],
            ])}
        >
            <Text align="center" size="s" text={text} />
        </span>
    );
}
