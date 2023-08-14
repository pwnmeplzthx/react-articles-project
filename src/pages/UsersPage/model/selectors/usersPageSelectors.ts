import { StateSchema } from '@/app/providers/StoreProvider';
import { UserSortField, UserView } from '@/entities/User/model/consts/consts';

export const getUsersPageIsLoading = (state: StateSchema) => state.usersPage?.isLoading || false;
export const getUsersPageError = (state: StateSchema) => state.usersPage?.error;
export const getUsersPageView = (state: StateSchema) => state.usersPage?.view || UserView.SMALL;
export const getUsersPageNum = (state: StateSchema) => state.usersPage?.page || 1;
export const getUsersPageLimit = (state: StateSchema) => state.usersPage?.limit || 9;
export const getUsersPageHasMore = (state: StateSchema) => state.usersPage?.hasMore;
export const getUsersPageInited = (state: StateSchema) => state.usersPage?._inited;
export const getUsersPageOrder = (state: StateSchema) => state.usersPage?.order ?? 'asc';
export const getUsersPageSort = (state: StateSchema) => state.usersPage?.sort ?? UserSortField.CREATED;
export const getUsersPageSearch = (state: StateSchema) => state.usersPage?.search ?? '';
