import { memo } from 'react';
import { CustomersFilters } from '@/widgets/CustomersFilters';
import { useCustomerFilters } from '../../lib/hooks/useCustomerFilters';

interface FiltersContainerProps {
    className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
    const { className } = props;
    const {
        onChangeSort,
        sort,
        onChangeSearch,
        search,
        onChangeOrder,
        order,
    } = useCustomerFilters();

    return (
        <CustomersFilters
            onChangeSearch={onChangeSearch}
            order={order}
            onChangeOrder={onChangeOrder}
            search={search}
            sort={sort}
            onChangeSort={onChangeSort}
            className={className}
        />
    );
});
