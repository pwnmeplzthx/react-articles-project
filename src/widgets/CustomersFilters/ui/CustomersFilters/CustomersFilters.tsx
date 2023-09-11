import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CustomersFilters.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { SortOrder } from '@/shared/types/sort';
import { Input } from '@/shared/ui/redesigned/Input';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { CustomerSortField } from '@/entities/Customer/model/consts/consts';
import { CustomerSortSelector } from '@/entities/Customer/ui/CustomerSortSelector/CustomerSortSelector';
import { Text } from '@/shared/ui/redesigned/Text';

interface CustomersFiltersProps {
    className?: string;
    sort: CustomerSortField;
    order: SortOrder;
    search: string;
    onChangeSearch: (value: string) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: CustomerSortField) => void;
}

export const CustomersFilters = memo((props: CustomersFiltersProps) => {
    const {
        className,
        onChangeSearch,
        search,
        onChangeSort,
        sort,
        onChangeOrder,
        order,
    } = props;
    const { t } = useTranslation();

    return (
        // <Card
        //     className={classNames(cls.CustomersFilters, [className])}
        //     padding="24"
        // >
        //     <VStack gap="32">
        //         <Input
        //             onChange={onChangeSearch}
        //             value={search}
        //             size="s"
        //             placeholder={t('Поиск')}
        //             addonLeft={<Icon Svg={SearchIcon} />}
        //         />
        //         <CustomerSortSelector
        //             order={order}
        //             sort={sort}
        //             onChangeOrder={onChangeOrder}
        //             onChangeSort={onChangeSort}
        //         />
        //     </VStack>
        // </Card>
        <HStack gap="32" max justify="between" align="center">
            <Text title={t('Клиенты')} />
            <Input
                onChange={onChangeSearch}
                value={search}
                size="s"
                placeholder={t('Поиск')}
                addonLeft={<Icon Svg={SearchIcon} />}
            />
        </HStack>
    );
});
