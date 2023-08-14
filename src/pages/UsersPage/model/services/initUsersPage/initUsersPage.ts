import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { SortOrder } from '@/shared/types/sort';
import { fetchUsersList } from '../fetchUsersList/fetchUsersList';
import { getUsersPageInited } from '../../selectors/usersPageSelectors';
import { UserSortField } from '@/entities/User/model/consts/consts';
import { usersPageActions } from '../../slices/usersPageSlice';

export const initUsersPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
    >(
        'usersPage/initUsersPage',
        async (searchParams, thunkApi) => {
            const { getState, dispatch } = thunkApi;
            const inited = getUsersPageInited(getState());

            if (!inited) {
                const orderFromUrl = searchParams.get('order') as SortOrder;
                const sortFromUrl = searchParams.get('sort') as UserSortField;
                const searchFromUrl = searchParams.get('search');
                const typeFromUrl = searchParams.get('type');

                if (orderFromUrl) {
                    dispatch(usersPageActions.setOrder(orderFromUrl));
                }
                if (sortFromUrl) {
                    dispatch(usersPageActions.setSort(sortFromUrl));
                }
                if (searchFromUrl) {
                    dispatch(usersPageActions.setSearch(searchFromUrl));
                }

                dispatch(usersPageActions.initState());
                dispatch(fetchUsersList({}));
            }
        },
    );
