import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import cls from './CustomersPage.module.scss';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { customersPageReducer } from '../model/slices/customersPageSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { initCustomersPage } from '../model/services/initCustomersPage/initCustomersPage';
import { fetchNextCustomersPage } from '../model/services/fetchNextCustomersPage/fetchNextCustomersPage';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ViewSelectorContainer } from './ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from './FiltersContainer/FiltersContainer';
import { Page } from '@/widgets/Page/Page';
import { classNames } from '@/shared/lib/classNames/classNames';
import { CustomerInfiniteList } from './CustomerInfiniteList/CustomerInfiniteList';
import { CustomersTable } from '@/features/customersTable/ui/CustomersTable';

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

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextCustomersPage());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initCustomersPage(searchParams));
    });

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            {/* <StickyContentLayout
                left={<ViewSelectorContainer />}
                right={<FiltersContainer />}
                content={( */}
            <Page
                data-testid="UsersPage"
                // onScrollEnd={onLoadNextPart}
                className={classNames(
                    cls.usersPage,
                    [className],
                )}
            >
                {/* <CustomerInfiniteList className={cls.list} /> */}
                <CustomersTable />
            </Page>
            {/* )}
            /> */}
        </DynamicModuleLoader>
    );
};

export default memo(CustomersPage);
