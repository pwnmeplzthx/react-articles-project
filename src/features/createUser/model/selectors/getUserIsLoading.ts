import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserIsLoading = (state: StateSchema) => state.createUser?.isLoading;
