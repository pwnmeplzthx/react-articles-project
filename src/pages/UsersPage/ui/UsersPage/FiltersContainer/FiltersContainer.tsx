import { memo } from 'react';
import { useUserFilters } from '../../../lib/hooks/useUserFilters';
import { UsersFilters } from '@/widgets/UsersFilters';

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
    } = useUserFilters();

    return (
        <UsersFilters
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
