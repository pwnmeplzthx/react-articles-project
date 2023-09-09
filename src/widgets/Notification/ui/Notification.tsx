import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Notification.module.scss';

interface NotificationProps {
    className?: string;
}

export const Notification = memo((props: NotificationProps) => {
    const { t } = useTranslation();
    const { className } = props;

    return (
        <div className={classNames(cls.notification, [className])}>
            Notification content
        </div>
    );
});
