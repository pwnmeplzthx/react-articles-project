import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserDetailsData = (state: StateSchema) => state.userDetails?.data;
export const getUserDetailsForm = (state: StateSchema) => state.userDetails?.form;
export const getUserDetailsIsLoading = (state: StateSchema) => state.userDetails?.isLoading || false;
export const getUserDetailsError = (state: StateSchema) => state.userDetails?.error;
export const getUserDetailsReadonly = (state: StateSchema) => state.userDetails?.readonly;
export const getUserDetailsValidateErrors = (state: StateSchema) => state.userDetails?.validateErrors;
