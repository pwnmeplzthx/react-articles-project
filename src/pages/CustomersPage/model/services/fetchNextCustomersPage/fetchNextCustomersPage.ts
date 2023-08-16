import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { fetchCustomersList } from '../fetchCustomersList/fetchCustomersList';
import { customersPageActions } from '../../slices/customersPageSlice';
import { getCustomersPageHasMore, getCustomersPageIsLoading, getCustomersPageNum } from '../../selectors/customersPageSelectors';

export const fetchNextCustomersPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
    >(
        'customersPage/fetchNextCustomersPage',
        async (_, thunkApi) => {
            const { getState, dispatch } = thunkApi;
            const hasMore = getCustomersPageHasMore(getState());
            const page = getCustomersPageNum(getState());
            const isLoading = getCustomersPageIsLoading(getState());

            if (hasMore && !isLoading) {
                dispatch(customersPageActions.setPage(page + 1));
                dispatch(fetchCustomersList({}));
            }
        },
    );
