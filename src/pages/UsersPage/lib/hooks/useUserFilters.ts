import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
    getUsersPageOrder,
    getUsersPageSearch,
    getUsersPageSort,
    getUsersPageView,
} from '../../model/selectors/usersPageSelectors';
import { usersPageActions } from '../../model/slices/usersPageSlice';
import { SortOrder } from '@/shared/types/sort';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchUsersList } from '../../model/services/fetchUsersList/fetchUsersList';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { UserSortField, UserView } from '@/entities/User/model/consts/consts';

export function useUserFilters() {
    const view = useSelector(getUsersPageView);
    const sort = useSelector(getUsersPageSort);
    const order = useSelector(getUsersPageOrder);
    const search = useSelector(getUsersPageSearch);

    const dispatch = useAppDispatch();

    const fetchData = useCallback(() => {
        dispatch(fetchUsersList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback(
        (view: UserView) => {
            dispatch(usersPageActions.setView(view));
        },
        [dispatch],
    );

    const onChangeSort = useCallback(
        (newSort: UserSortField) => {
            dispatch(usersPageActions.setSort(newSort));
            dispatch(usersPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeOrder = useCallback(
        (newOrder: SortOrder) => {
            dispatch(usersPageActions.setOrder(newOrder));
            dispatch(usersPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(usersPageActions.setSearch(search));
            dispatch(usersPageActions.setPage(1));
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
