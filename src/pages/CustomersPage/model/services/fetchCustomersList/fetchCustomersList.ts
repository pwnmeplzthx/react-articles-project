import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Customer } from '@/entities/Customer';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import {
    getCustomersPageLimit, getCustomersPageNum, getCustomersPageOrder, getCustomersPageSearch, getCustomersPageSort,
} from '../../selectors/customersPageSelectors';

interface FetchCustomersListProps {
    // Индикатор: заменить пришедшие данные или добавить
    replace?: boolean;
}

export const fetchCustomersList = createAsyncThunk<
    Customer[],
    FetchCustomersListProps,
    ThunkConfig<string>
    >(
        'customersPage/fetchCustomersList',
        async (props, thunkApi) => {
            const { extra, rejectWithValue, getState } = thunkApi;
            const limit = getCustomersPageLimit(getState());
            const sort = getCustomersPageSort(getState());
            const order = getCustomersPageOrder(getState());
            const search = getCustomersPageSearch(getState());
            const page = getCustomersPageNum(getState());

            try {
                addQueryParams({
                    sort, order, search,
                });
                const response = await extra.api.get<Customer[]>('/customers', {
                    params: {
                        // _limit: limit,
                        _page: page,
                        // _sort: sort,
                        _order: order,
                        // Поисковая строка, см доку json fake api
                        q: search,
                    },
                });

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (error) {
                console.log('error', error);
                return rejectWithValue('error');
            }
        },
    );
