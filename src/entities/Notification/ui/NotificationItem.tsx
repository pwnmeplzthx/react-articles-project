import {
    useEffect,
    useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import CrossIcon from '@/shared/assets/icons/cross-20x20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Portal } from '@/shared/ui/redesigned/Portal/Portal';
import { Text } from '@/shared/ui/redesigned/Text';
import { notificationActions } from '../model/slice/notificationSlice';
import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
    message: string;
    type: string;
}

export type NotificationType = 'success' | 'danger' | 'warning' | 'info'

export const NotificationItem = (props: NotificationItemProps) => {
    const {
        message,
        type = 'success',
    } = props;

    const { t } = useTranslation();

    const [notificationMsg, setNotificationMsg] = useState('');
    const dispatch = useAppDispatch();

    // Remove notification
    const removeNotification = () => {
        setTimeout(() => {
            dispatch(notificationActions.setNotification({ message: '', type: 'success' }));
        }, 300);
    };

    // Update notification when message changes
    useEffect(() => {
        setTimeout(() => {
            setNotificationMsg(message);
            setTimeout(() => {
                removeNotification();
            }, 5000);
        }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message]);

    return (
        <Portal element={document.body}>
            <div className={classNames(cls.notification, [cls[type]])}>
                <Icon
                    className={classNames(cls.delete, [])}
                    Svg={CrossIcon}
                    clickable
                    onClick={removeNotification}
                    width={16}
                    height={16}
                    title={t('Закрыть уведомление')}
                />
                <Text text={notificationMsg} variant="dark" />
            </div>
        </Portal>
    );
};
