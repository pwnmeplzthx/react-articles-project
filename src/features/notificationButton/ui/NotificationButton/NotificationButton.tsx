import { NotificationList } from 'entities/Notification';
import { memo, useCallback, useState } from 'react';
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from 'shared/ui/Icon/Icon';
import { Popover } from 'shared/ui/Popups';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { BrowserView, MobileView } from 'react-device-detect';
import { Drawer } from 'shared/ui/Drawer/Drawer';
import { AnimationProvider } from 'shared/lib/components/AnimationProvider';
import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;

    // Для шторки на мобилках
    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    const trigger = (
        <Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
            <Icon Svg={NotificationIcon} inverted />
        </Button>
    );

    return (
        <>
            <BrowserView>
                <Popover
                    className={classNames(cls.notificationButton, [className])}
                    direction="bottom left"
                    trigger={(
                        <Button theme={ButtonTheme.CLEAR}>
                            <Icon Svg={NotificationIcon} inverted />
                        </Button>
                    )}
                >
                    <NotificationList className={cls.notifications} />
                </Popover>
            </BrowserView>
            <MobileView>
                {trigger}
                <AnimationProvider>
                    <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                        <NotificationList />
                    </Drawer>
                </AnimationProvider>
            </MobileView>
        </>
    );
});
