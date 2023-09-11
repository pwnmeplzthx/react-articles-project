import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TableColumn } from 'react-data-table-component';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { DataTableBase } from '@/widgets/DataTable';
import { Page } from '@/widgets/Page/Page';
import { fetchNextCustomersPage } from '../model/services/fetchNextCustomersPage/fetchNextCustomersPage';
import { initCustomersPage } from '../model/services/initCustomersPage/initCustomersPage';
import { customersPageReducer, getCustomers } from '../model/slices/customersPageSlice';
import cls from './CustomersPage.module.scss';
import { Customer } from '@/entities/Customer';
import { fetchCustomersList } from '../model/services/fetchCustomersList/fetchCustomersList';
import { getCustomersPageIsLoading } from '../model/selectors/customersPageSelectors';

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

    console.log(customers);
    console.log(customers);
    console.log(customers);

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
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(CustomersPage);
