import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { Select, SelectOption } from '@/shared/ui/Select/Select';
import { CustomerSortField } from '../../model/consts/consts';
import cls from './CustomerSortSelector.module.scss';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { ListBox } from '@/shared/ui/redesigned/Popups';

interface CustomerSortSelectorProps {
    className?: string;
    sort: CustomerSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: CustomerSortField) => void;
}

export const CustomerSortSelector = memo((props: CustomerSortSelectorProps) => {
    const {
        className, onChangeOrder, onChangeSort, order, sort,
    } = props;
    const { t } = useTranslation();

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
        {
            value: 'asc',
            content: t('возрастанию'),
        },
        {
            value: 'desc',
            content: t('убыванию'),
        },
    ], [t]);

    const sortFieldOptions = useMemo<SelectOption<CustomerSortField>[]>(() => [
        {
            value: CustomerSortField.CREATED,
            content: t('дате создания'),
        },
        {
            value: CustomerSortField.MODIFIED,
            content: t('дате изменения'),
        },
        {
            value: CustomerSortField.NAME,
            content: t('ФИО'),
        },
        {
            value: CustomerSortField.IS_CONFLICT,
            content: t('указателю "конфликтный"'),
        },
        {
            value: CustomerSortField.IS_REFUSENIC,
            content: t('указателю "отказник"'),
        },
    ], [t]);

    return (
        <div
            className={classNames(
                cls.CustomerSortSelectorRedesigned,
                [className],
            )}
        >
            <VStack gap="8">
                <Text text={t('Сортировать по:')} />
                <ListBox
                    items={sortFieldOptions}
                    value={sort}
                    onChange={onChangeSort}
                />
                <ListBox
                    items={orderOptions}
                    value={order}
                    onChange={onChangeOrder}
                />
            </VStack>
        </div>
    );
});
