import { StateSchema } from '@/app/providers/StoreProvider';
import { CustomerSortField, CustomerView } from '@/entities/Customer/model/consts/consts';

export const getCustomersPageIsLoading = (state: StateSchema) => state.customersPage?.isLoading || false;
export const getCustomersPageError = (state: StateSchema) => state.customersPage?.error;
export const getCustomersPageView = (state: StateSchema) => state.customersPage?.view || CustomerView.SMALL;
export const getCustomersPageNum = (state: StateSchema) => state.customersPage?.page || 1;
export const getCustomersPageLimit = (state: StateSchema) => state.customersPage?.limit || 9;
export const getCustomersPageHasMore = (state: StateSchema) => state.customersPage?.hasMore;
export const getCustomersPageInited = (state: StateSchema) => state.customersPage?._inited;
export const getCustomersPageOrder = (state: StateSchema) => state.customersPage?.order ?? 'asc';
export const getCustomersPageSort = (state: StateSchema) => state.customersPage?.sort ?? CustomerSortField.CREATED;
export const getCustomersPageSearch = (state: StateSchema) => state.customersPage?.search ?? '';
