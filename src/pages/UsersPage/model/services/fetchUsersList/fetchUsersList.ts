import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '@/entities/User';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import {
    getUsersPageLimit, getUsersPageNum, getUsersPageOrder, getUsersPageSearch, getUsersPageSort,
} from '../../selectors/usersPageSelectors';

interface FetchUsersListProps {
    // Индикатор: заменить пришедшие данные или добавить
    replace?: boolean;
}

export const fetchUsersList = createAsyncThunk<
    User[],
    FetchUsersListProps,
    ThunkConfig<string>
    >(
        'usersPage/fetchUsersList',
        async (props, thunkApi) => {
            const { extra, rejectWithValue, getState } = thunkApi;
            const limit = getUsersPageLimit(getState());
            const sort = getUsersPageSort(getState());
            const order = getUsersPageOrder(getState());
            const search = getUsersPageSearch(getState());
            const page = getUsersPageNum(getState());

            try {
                addQueryParams({
                    sort, order, search,
                });
                const response = await extra.api.get<User[]>('/users', {
                    params: {
                        _limit: limit,
                        _page: page,
                        _sort: sort,
                        _order: order,
                        // Поисковая строка, см доку json fake api
                        q: search,
                    },
                });

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                return rejectWithValue('error');
            }
        },
    );
