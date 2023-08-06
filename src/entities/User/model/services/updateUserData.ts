import { createAsyncThunk } from '@reduxjs/toolkit';
import { StateSchema, ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '@/entities/User';
import { getUserDetailsForm } from '../selectors/userDetails';
import { ValidateUserError } from '../consts/consts';
import { validateUserData } from './validateUserData';

export const updateUserData = createAsyncThunk<
    User,
    void,
    ThunkConfig<ValidateUserError[]>
    >(
        'user/updateUserData',
        async (_, thunkApi) => {
            const { extra, rejectWithValue, getState } = thunkApi;

            const formData = getUserDetailsForm(getState());

            const errors = validateUserData(formData);

            if (errors.length) {
                return rejectWithValue(errors);
            }

            try {
                const response = await extra.api.put<User>(
                    `/user/${formData?.id}`,
                    formData,
                );

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                console.log(e);
                return rejectWithValue([ValidateUserError.SERVER_ERROR]);
            }
        },
    );
function getUserForm(arg0: StateSchema) {
    throw new Error('Function not implemented.');
}
