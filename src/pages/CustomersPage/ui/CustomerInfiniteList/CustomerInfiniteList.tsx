import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Text } from '@/shared/ui/redesigned/Text';
import { getCustomersPageError, getCustomersPageIsLoading, getCustomersPageView } from '../../model/selectors/customersPageSelectors';
import { CustomerList } from '@/entities/Customer/ui/CustomerList/CustomerList';
import { getCustomers } from '../../model/slices/customersPageSlice';

interface CustomerInfiniteListProps {
    className?: string;
}

export const CustomerInfiniteList = memo((props: CustomerInfiniteListProps) => {
    const { className } = props;
    const customers = useSelector(getCustomers.selectAll);
    const isLoading = useSelector(getCustomersPageIsLoading);
    const view = useSelector(getCustomersPageView);
    const error = useSelector(getCustomersPageError);
    const { t } = useTranslation();

    if (error) {
        return <Text text={t('Ошибка при загрузке списка пользователей')} />;
    }

    return (
        <CustomerList
            isLoading={isLoading}
            view={view}
            customers={customers}
            className={className}
        />
    );
});
