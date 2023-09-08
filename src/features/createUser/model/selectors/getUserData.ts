import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserData = (state: StateSchema) => state.createUser?.data;
