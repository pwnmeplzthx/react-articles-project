import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getRouteUserDetails } from '@/app/providers/router/config/routeConfig';
import { UserView } from '@/entities/User/model/consts/consts';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { UserListItemProps } from '../UserListItem';
import cls from './UserListItemRedesigned.module.scss';
import UnknownUser from '@/shared/assets/icons/unknown_user.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';

export const UserListItemRedesigned = memo((props: UserListItemProps) => {
    const {
        className, user, view, target,
    } = props;
    const { t } = useTranslation();

    if (view === UserView.BIG) {
        return (
            <Card
                padding="24"
                max
                border="round"
                data-testid="UserListItem"
                className={classNames(cls.UserListItem, [
                    className,
                    cls[view],
                ])}
            >
                <HStack align="start" max gap="16">
                    <div className={cls.avatarWrapper}>
                        {user.user_icon
                            ? (
                                <AppImage
                                    fallback={<Skeleton width={150} height={150} />}
                                    alt={user.username}
                                    src={user.user_icon}
                                    className={cls.img}
                                />
                            )
                            : (
                                <Icon Svg={UnknownUser} width={150} height="100%" />
                            )}
                        <Text text={`${user.username}`} />
                        <Text text={`${user.roles?.length && user.roles[0]}`} />
                    </div>
                    <VStack className={cls.info} gap="16" max>
                        <Text title={`${user.surname} ${user.name} ${user.patronymic}`} />
                        <VStack className={cls.info} gap="8" max>
                            <Input
                                value={user.phone}
                                label={t('Телефон')}
                                readonly
                                size="s"
                            />
                            <Input
                                value={user.whatsapp}
                                label={t('Whatsapp')}
                                readonly
                                size="s"
                            />
                            <Input
                                value={user.telegram}
                                label={t('Telegram')}
                                readonly
                                size="s"
                            />
                            <Input
                                value={user.email}
                                label={t('Почта')}
                                readonly
                                size="s"
                            />
                        </VStack>
                        <VStack gap="4" className={cls.footer} max>
                            <HStack max justify="end">
                                <AppLink
                                    target={target}
                                    to={getRouteUserDetails(user.id || '')}
                                >
                                    <Button variant="outline">
                                        {t('Подробнее')}
                                    </Button>
                                </AppLink>
                            </HStack>
                        </VStack>
                    </VStack>
                </HStack>
            </Card>
        );
    }

    return (
        <AppLink
            data-testid="UserListItem"
            target={target}
            to={getRouteUserDetails(user.id || '')}
            className={classNames(cls.UserListItem, [
                className,
                cls[view],
            ])}
        >
            <Card className={cls.card} border="round" padding="0">
                {user.user_icon
                    ? (
                        <AppImage
                            fallback={<Skeleton width="100%" height={140} />}
                            alt={user.username}
                            src={user.user_icon}
                            className={cls.img}
                        />
                    )
                    : (
                        <Icon Svg={UnknownUser} width="100%" height={260} />
                    )}

                <VStack align="center" className={cls.info} gap="4">
                    <Text text={user.username} />
                    <Text title={`${user.surname}`} />
                    <Text title={`${user.name}`} />
                    <Text text={`${user.roles?.length && user.roles[0]}`} />
                    <VStack align="center" gap="4" className={cls.footer} max>
                        <Text
                            text={user.phone}
                            className={cls.date}
                        />
                        <Text
                            text={user.email}
                            className={cls.date}
                        />
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    );
});
