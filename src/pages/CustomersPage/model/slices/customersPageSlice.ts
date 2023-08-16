import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { SortOrder } from '@/shared/types/sort';
import { Customer } from '@/entities/Customer';
import { CustomerSortField, CustomerView } from '@/entities/Customer/model/consts/consts';
import { fetchCustomersList } from '../services/fetchCustomersList/fetchCustomersList';
import { CustomersPageSchema } from '../types/customersPageSchema';

const customersAdapter = createEntityAdapter<Customer>({
    selectId: (customer) => customer.id,
});

export const getCustomers = customersAdapter.getSelectors<StateSchema>(
    (state) => state.customersPage || customersAdapter.getInitialState(),
);

const customersPageSlice = createSlice({
    name: 'customersPageSlice',
    initialState: customersAdapter.getInitialState<CustomersPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: CustomerView.SMALL,
        page: 1,
        hasMore: true,
        _inited: false,
        limit: 9,
        sort: CustomerSortField.CREATED,
        search: '',
        order: 'asc',

    }),
    reducers: {
        setView: (state, action: PayloadAction<CustomerView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<CustomerSortField>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        initState: (state) => {
            const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as CustomerView;
            state.view = view;
            state.limit = view === CustomerView.BIG ? 4 : 9;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomersList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    customersAdapter.removeAll(state);
                }
            })
            .addCase(fetchCustomersList.fulfilled, (
                state,
                action,
            ) => {
                state.isLoading = false;

                state.hasMore = action.payload.length >= state.limit;

                if (action.meta.arg.replace) {
                    // Заменяем массив записей
                    customersAdapter.setAll(state, action.payload);
                } else {
                    // Добавляем записи с помощью addMany
                    customersAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchCustomersList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: customersPageReducer,
    actions: customersPageActions,
} = customersPageSlice;
