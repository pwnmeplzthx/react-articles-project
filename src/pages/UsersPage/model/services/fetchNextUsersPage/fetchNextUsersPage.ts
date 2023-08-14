import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUsersPageHasMore, getUsersPageIsLoading, getUsersPageNum } from '../../selectors/usersPageSelectors';
import { fetchUsersList } from '../fetchUsersList/fetchUsersList';
import { usersPageActions } from '../../slices/usersPageSlice';

export const fetchNextUsersPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
    >(
        'usersPage/fetchNextUsersPage',
        async (_, thunkApi) => {
            const { getState, dispatch } = thunkApi;
            const hasMore = getUsersPageHasMore(getState());
            const page = getUsersPageNum(getState());
            const isLoading = getUsersPageIsLoading(getState());

            if (hasMore && !isLoading) {
                dispatch(usersPageActions.setPage(page + 1));
                dispatch(fetchUsersList({}));
            }
        },
    );
