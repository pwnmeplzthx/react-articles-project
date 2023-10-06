import { memo } from 'react';
import { TableColumn } from 'react-data-table-component';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Customer } from '@/entities/Customer';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { DataTableBase } from '@/widgets/DataTable';
import { Page } from '@/widgets/Page/Page';
import { getCustomersPageIsLoading } from '../model/selectors/customersPageSelectors';
import { initCustomersPage } from '../model/services/initCustomersPage/initCustomersPage';
import { customersPageReducer, getCustomers } from '../model/slices/customersPageSlice';
import cls from './CustomersPage.module.scss';
import { FiltersContainer } from './FiltersContainer/FiltersContainer';

interface CustomersPageProps {
    className?: string;
}

const reducers: ReducersList = {
    customersPage: customersPageReducer,
};

const CustomersPage = (props: CustomersPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    // const onLoadNextPart = useCallback(() => {
    //     dispatch(fetchNextCustomersPage());
    // }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initCustomersPage(searchParams));
    });

    const columns: TableColumn<Customer>[] = [
        {
            name: t('ФИО'),
            selector: (row: any) => row.name,
        },
        {
            name: t('Телефон'),
            selector: (row: any) => row.phone,
        },
        {
            name: t('Почта'),
            selector: (row: any) => row.email,
        },
        {
            name: t('Заметка'),
            selector: (row: any) => row.notes,
        },
    ];

    const customers = useSelector(getCustomers.selectAll);
    // TODO сделать скелетон во время загрузки
    const isLoading = useSelector(getCustomersPageIsLoading);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page
                data-testid="CustomerssPage"
                className={classNames(
                    cls.usersPage,
                    [className],
                )}
            >
                <DataTableBase
                    columns={columns}
                    data={customers}
                    isLoading={isLoading}
                    filtersContainer={<FiltersContainer />}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(CustomersPage);
