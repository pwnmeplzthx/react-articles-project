import { StateSchema } from 'app/providers/StoreProvider';

export const getUserIsInitedAuthData = (state: StateSchema) => state.user._isInitedAuthData;
