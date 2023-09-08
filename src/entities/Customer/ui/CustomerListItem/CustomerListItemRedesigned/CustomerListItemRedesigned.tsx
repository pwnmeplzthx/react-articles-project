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
import { Button } from '@/shared/ui/redesigned/Button';
import { Customer } from '@/entities/Customer';
import { Input } from '@/shared/ui/redesigned/Input';

export const CustomerListItemRedesigned = memo((props: CustomerListItemProps) => {
    const {
        className, customer, view, target,
    } = props;
    const { t } = useTranslation();

    const conflictCustomer = customer.is_conflict || customer.is_refusenic;

    const splitNameArray = customer.name.split(' ');

    const renderSplitName = (namePart: string) => (<Text title={namePart} />);

    const badCustomerHandler = (customer: Customer) => {
        if (!customer.is_active) {
            return (<Text title={t('Заблокирован')} variant="error" size="s" className={cls.date} />);
        }
        if (customer.is_conflict && customer.is_refusenic) {
            return (<Text title={t('Конфликтный отказник')} variant="error" size="s" className={cls.date} />);
        }
        if (customer.is_conflict) {
            return (<Text title={t('Конфликтный')} variant="error" size="s" className={cls.date} />);
        }
        if (customer.is_refusenic) {
            return (<Text title={t('Отказник')} variant="error" size="s" className={cls.date} />);
        }

        return null;
    };

    if (view === CustomerView.BIG) {
        return (
            <Card
                padding="24"
                max
                border="round"
                data-testid="CustomerListItem"
                className={classNames(
                    cls.CustomerListItem,
                    [
                        className,
                        cls[view],
                    ],
                    { [cls.redCard]: conflictCustomer },
                )}
            >
                <HStack align="start" max gap="16">
                    <VStack className={cls.info} gap="16" max>
                        <HStack max gap="8" justify="between">
                            <Text title={customer.name} />
                            {badCustomerHandler(customer)}
                        </HStack>
                        <HStack max gap="8" align="start">
                            <VStack className={cls.info} gap="8">
                                <Input
                                    value={customer.phone}
                                    label={t('Телефон')}
                                    readonly
                                />
                                <Input
                                    value={customer.created_at}
                                    label={t('Дата создания')}
                                    readonly
                                />
                            </VStack>
                            <VStack gap="8" justify="start">
                                <Input
                                    value={customer.email}
                                    label={t('Почта')}
                                    readonly
                                />
                            </VStack>
                        </HStack>
                        <Input
                            value={customer.notes}
                            label={t('Заметка')}
                            readonly
                        />
                        <VStack gap="4" className={cls.footer} max>
                            <HStack max justify="between">
                                <Input
                                    value={customer.customer_source}
                                    label={t('Узнал из')}
                                    readonly
                                    widthPercent="threeQuarters"
                                />
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
            <Card className={classNames(cls.card, [], { [cls.redCard]: conflictCustomer })} border="round" padding="0">
                <VStack maxHeight max justify="center" align="center" className={cls.info} gap="4">
                    <Text title={splitNameArray[0]} />
                    <Text title={splitNameArray[1]} />
                    <Text title={splitNameArray[2]} />
                    <VStack justify="center" align="center" gap="4">
                        {badCustomerHandler(customer)}
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
