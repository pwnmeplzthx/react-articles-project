import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
    getCustomersPageOrder,
    getCustomersPageSearch,
    getCustomersPageSort,
    getCustomersPageView,
} from '../../model/selectors/customersPageSelectors';
import { customersPageActions } from '../../model/slices/customersPageSlice';
import { SortOrder } from '@/shared/types/sort';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchCustomersList } from '../../model/services/fetchCustomersList/fetchCustomersList';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { CustomerSortField, CustomerView } from '@/entities/Customer/model/consts/consts';

export function useCustomerFilters() {
    const view = useSelector(getCustomersPageView);
    const sort = useSelector(getCustomersPageSort);
    const order = useSelector(getCustomersPageOrder);
    const search = useSelector(getCustomersPageSearch);

    const dispatch = useAppDispatch();

    const fetchData = useCallback(() => {
        dispatch(fetchCustomersList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback(
        (view: CustomerView) => {
            dispatch(customersPageActions.setView(view));
        },
        [dispatch],
    );

    const onChangeSort = useCallback(
        (newSort: CustomerSortField) => {
            dispatch(customersPageActions.setSort(newSort));
            dispatch(customersPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeOrder = useCallback(
        (newOrder: SortOrder) => {
            dispatch(customersPageActions.setOrder(newOrder));
            dispatch(customersPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(customersPageActions.setSearch(search));
            dispatch(customersPageActions.setPage(1));
            debouncedFetchData();
        },
        [dispatch, debouncedFetchData],
    );

    return {
        view,
        sort,
        order,
        search,
        onChangeView,
        onChangeSort,
        onChangeOrder,
        onChangeSearch,
    };
}
