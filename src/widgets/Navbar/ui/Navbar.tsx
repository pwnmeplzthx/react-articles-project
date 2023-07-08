import { getUserAuthData, userActions } from 'entities/User';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { HStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { t } = useTranslation();
    const { className } = props;
    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    console.log('authData', authData);

    if (authData) {
        return (
            <header className={classNames(cls.navbar, [className])}>
                <Dropdown
                    direction="bottom left"
                    className={cls.dropdown}
                    items={[
                        {
                            content: t('Profile'),
                            href: RoutePath.profile + authData.id,
                        },
                        {
                            content: t('Log out'),
                            onClick: onLogout,
                        },
                    ]}
                    trigger={(
                        <HStack gap="8">
                            <Text theme={TextTheme.INVERTED} size={TextSize.S} text={authData.username} />
                            <Avatar size={30} src={authData.avatar} />
                        </HStack>
                    )}
                />
            </header>
        );
    }

    return (
        <header className={classNames(cls.navbar, [className])} />
    );
});
