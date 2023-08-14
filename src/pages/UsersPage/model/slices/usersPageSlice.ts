import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { SortOrder } from '@/shared/types/sort';
import { User } from '@/entities/User';
import { UserSortField, UserView } from '@/entities/User/model/consts/consts';
import { fetchUsersList } from '../services/fetchUsersList/fetchUsersList';
import { UsersPageSchema } from '../types/usersPageSchema';

const usersAdapter = createEntityAdapter<User>({
    selectId: (user) => user.id,
});

export const getUsers = usersAdapter.getSelectors<StateSchema>(
    (state) => state.usersPage || usersAdapter.getInitialState(),
);

const usersPageSlice = createSlice({
    name: 'usersPageSlice',
    initialState: usersAdapter.getInitialState<UsersPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: UserView.SMALL,
        page: 1,
        hasMore: true,
        _inited: false,
        limit: 9,
        sort: UserSortField.CREATED,
        search: '',
        order: 'asc',

    }),
    reducers: {
        setView: (state, action: PayloadAction<UserView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<UserSortField>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        initState: (state) => {
            const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as UserView;
            state.view = view;
            state.limit = view === UserView.BIG ? 4 : 9;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    usersAdapter.removeAll(state);
                }
            })
            .addCase(fetchUsersList.fulfilled, (
                state,
                action,
            ) => {
                state.isLoading = false;

                state.hasMore = action.payload.length >= state.limit;

                if (action.meta.arg.replace) {
                    // Заменяем массив записей
                    usersAdapter.setAll(state, action.payload);
                } else {
                    // Добавляем записи с помощью addMany
                    usersAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchUsersList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: usersPageReducer,
    actions: usersPageActions,
} = usersPageSlice;
