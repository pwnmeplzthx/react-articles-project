import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { validateUserData } from '../validateUserData/validateUserData';
import { ValidateUserError } from '@/entities/User/model/consts/consts';
import { User } from '@/entities/User';
import { getUserData } from '../../selectors/getUserData';

export const createUserData = createAsyncThunk<
    User,
    void,
    ThunkConfig<ValidateUserError[]>
    >(
        'user/createUserData',
        async (_, thunkApi) => {
            const { extra, rejectWithValue, getState } = thunkApi;

            const userData = getUserData(getState());

            const errors = validateUserData(userData);

            if (errors.length) {
                return rejectWithValue(errors);
            }

            try {
                const response = await extra.api.put<User>(
                    `/user/${userData?.id}`,
                    userData,
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
