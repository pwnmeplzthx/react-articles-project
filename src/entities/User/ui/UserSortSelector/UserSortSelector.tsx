import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { Select, SelectOption } from '@/shared/ui/Select/Select';
import { UserSortField } from '../../model/consts/consts';
import cls from './UserSortSelector.module.scss';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { ListBox } from '@/shared/ui/redesigned/Popups';

interface UserSortSelectorProps {
    className?: string;
    sort: UserSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: UserSortField) => void;
}

export const UserSortSelector = memo((props: UserSortSelectorProps) => {
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

    const sortFieldOptions = useMemo<SelectOption<UserSortField>[]>(() => [
        {
            value: UserSortField.CREATED,
            content: t('дате создания'),
        },
        {
            value: UserSortField.SALARY,
            content: t('зарплате'),
        },
        {
            value: UserSortField.NAME,
            content: t('имени'),
        },
        {
            value: UserSortField.SURNAME,
            content: t('фамилии'),
        },
    ], [t]);

    return (
        <div
            className={classNames(
                cls.UserSortSelectorRedesigned,
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
