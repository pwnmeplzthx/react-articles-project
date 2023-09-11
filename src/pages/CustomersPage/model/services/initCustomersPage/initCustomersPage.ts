import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { SortOrder } from '@/shared/types/sort';
import { fetchCustomersList } from '../fetchCustomersList/fetchCustomersList';
import { CustomerSortField } from '@/entities/Customer/model/consts/consts';
import { customersPageActions } from '../../slices/customersPageSlice';
import { getCustomersPageInited } from '../../selectors/customersPageSelectors';

export const initCustomersPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
    >(
        'customersPage/initCustomersPage',
        async (searchParams, thunkApi) => {
            const { getState, dispatch } = thunkApi;
            const inited = getCustomersPageInited(getState());

            if (!inited) {
                // const orderFromUrl = searchParams.get('order') as SortOrder;
                // const sortFromUrl = searchParams.get('sort') as CustomerSortField;
                // const searchFromUrl = searchParams.get('search');

                // if (orderFromUrl) {
                //     dispatch(customersPageActions.setOrder(orderFromUrl));
                // }
                // if (sortFromUrl) {
                //     dispatch(customersPageActions.setSort(sortFromUrl));
                // }
                // if (searchFromUrl) {
                //     dispatch(customersPageActions.setSearch(searchFromUrl));
                // }

                dispatch(customersPageActions.initState());
                dispatch(fetchCustomersList({}));
            }
        },
    );
