import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Theme } from '@/app/providers/ThemeProvider';
import {
    getUserAuthData, isUserAdmin,
    userActions,
} from '@/entities/User';
import { SettingsDrawer } from '@/shared/ui/SettingsDrawer/SettingsDrawer';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text, TextSize, TextTheme } from '@/shared/ui/Text/Text';
import { LangSwitcher } from '@/widgets/LangSwitcher';
import { ThemeButtonSwitcher } from '@/widgets/ThemeButtonSwitcher';
import { getRouteAdmin, getRouteProfile } from '@/app/providers/router/config/routeConfig';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isAdmin = useSelector(isUserAdmin);
    const authData = useSelector(getUserAuthData);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const isAdminPanelAvailable = isAdmin;

    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    if (!authData) {
        return null;
    }

    return (
        <>
            <Dropdown
                direction="bottom left"
                items={[
                    ...(isAdminPanelAvailable ? [{
                        content: t('Админка'),
                        href: getRouteAdmin(),
                    }] : []),
                    {
                        content: t('Profile'),
                        href: getRouteProfile(authData.id),
                    },
                    {
                        content: t('Настройки'),
                        onClick: onOpenDrawer,
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
            <SettingsDrawer isOpen={isOpen} onClose={onCloseDrawer}>
                <VStack gap="32" align="center">
                    <VStack gap="16">
                        <ThemeButtonSwitcher themeSwitch={Theme.LIGHT} />
                        <ThemeButtonSwitcher themeSwitch={Theme.DARK} />
                        <ThemeButtonSwitcher themeSwitch={Theme.KANAGAWA} />
                    </VStack>
                    <LangSwitcher />
                </VStack>
            </SettingsDrawer>
        </>
    );
});
