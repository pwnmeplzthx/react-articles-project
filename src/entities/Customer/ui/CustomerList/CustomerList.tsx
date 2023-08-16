import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './CustomerList.module.scss';
import { Customer } from '../../model/types/customer';
import { CustomerView } from '../../model/consts/consts';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { CustomerListItemSkeleton } from '../CustomerListItem/CustomerListItemSkeleton';
import { CustomerListItem } from '../CustomerListItem/CustomerListItem';

interface CustomerListProps {
    className?: string;
    customers: Customer[]
    isLoading?: boolean;
    view?: CustomerView;
    target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: CustomerView) => new Array(view === CustomerView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <CustomerListItemSkeleton className={cls.card} key={index} view={view} />
    ));

export const CustomerList = memo((props: CustomerListProps) => {
    const {
        className,
        customers,
        view = CustomerView.SMALL,
        isLoading,
        target,
    } = props;
    const { t } = useTranslation();

    if (!isLoading && !customers.length) {
        return (
            <div className={classNames(cls.customerList, [className, cls[view]])}>
                <Text size="l" title={t('Пользователи не найдены')} />
            </div>
        );
    }

    return (
        <HStack
            wrap="wrap"
            gap="16"
            className={classNames(cls.CustomerListRedesigned)}
            data-testid="CustomerList"
        >
            {customers.map((item) => (
                <CustomerListItem
                    customer={item}
                    view={view}
                    target={target}
                    key={item.id}
                    className={cls.card}
                />
            ))}
            {isLoading && getSkeletons(view)}
        </HStack>
    );
});
