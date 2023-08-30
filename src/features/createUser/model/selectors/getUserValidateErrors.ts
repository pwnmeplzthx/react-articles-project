import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserValidateErrors = (state: StateSchema) => state.createUser?.validateErrors;
