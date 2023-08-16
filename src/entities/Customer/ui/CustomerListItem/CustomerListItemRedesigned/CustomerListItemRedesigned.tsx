import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getRouteCustomerDetails } from '@/app/providers/router/config/routeConfig';
import { CustomerView } from '@/entities/Customer/model/consts/consts';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { CustomerListItemProps } from '../CustomerListItem';
import cls from './CustomerListItemRedesigned.module.scss';
import UnknownCustomer from '@/shared/assets/icons/unknown_customer.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Button } from '@/shared/ui/redesigned/Button';

export const CustomerListItemRedesigned = memo((props: CustomerListItemProps) => {
    const {
        className, customer, view, target,
    } = props;
    const { t } = useTranslation();

    if (view === CustomerView.BIG) {
        return (
            <Card
                padding="24"
                max
                border="round"
                data-testid="CustomerListItem"
                className={classNames(cls.CustomerListItem, [
                    className,
                    cls[view],
                ])}
            >
                <HStack align="start" max gap="16">
                    {/* <div className={cls.avatarWrapper}>
                        {customer.customer_icon
                            ? (
                                <AppImage
                                    fallback={<Skeleton width={150} height="100%" />}
                                    alt={customer.customername}
                                    src={customer.customer_icon}
                                    className={cls.img}
                                />
                            )
                            : (
                                <Icon Svg={UnknownCustomer} width={150} height="100%" />
                            )}
                        <Text text={`${customer.customername}`} />
                        <Text text={`${customer.roles?.length && customer.roles[0]}`} />
                    </div> */}
                    <VStack className={cls.info} gap="16" max>
                        <Text title={customer.name} />
                        <VStack className={cls.info} gap="8" max>
                            <Text
                                text={`Телефон:  ${customer.phone}`}
                                className={cls.date}
                            />
                            <Text
                                text={`Почта:  ${customer.email}`}
                                className={cls.date}
                            />
                        </VStack>
                        <VStack gap="4" className={cls.footer} max>
                            <HStack max justify="end">
                                <AppLink
                                    target={target}
                                    to={getRouteCustomerDetails(customer.id)}
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
            data-testid="CustomerListItem"
            target={target}
            to={getRouteCustomerDetails(customer.id)}
            className={classNames(cls.CustomerListItem, [
                className,
                cls[view],
            ])}
        >
            <Card className={cls.card} border="round" padding="0">
                {/* {customer.customer_icon
                    ? (
                        <AppImage
                            fallback={<Skeleton width="100%" height={140} />}
                            alt={customer.customername}
                            src={customer.customer_icon}
                            className={cls.img}
                        />
                    )
                    : (
                        <Icon Svg={UnknownCustomer} width="100%" height={260} />
                    )} */}

                <VStack className={cls.info} gap="4">
                    <Text text={customer.name} />
                    <VStack gap="4" className={cls.footer} max>
                        <Text
                            text={customer.phone}
                            className={cls.date}
                        />
                        <Text
                            text={customer.email}
                            className={cls.date}
                        />
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    );
});
