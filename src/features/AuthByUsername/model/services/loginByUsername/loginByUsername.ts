import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';
import { USER_LOCALSTORAGE_DATA, USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        try {
            const response = await thunkAPI.extra.api.post<any>(
                '/auth/jwt/login',
                `&username=${authData.username}&password=${authData.password}`,
                {
                    // headers: {
                    //     'Content-Type': 'multipart/form-data'
                    // },
                },
            );
            console.log('RESPONSE::');
            console.log(response);
            if (!response.data) {
                throw new Error();
            }
            const accessToken = response.data;

            localStorage.setItem(USER_LOCALSTORAGE_KEY, (`Bearer ${accessToken.access_token}`));
            thunkAPI.dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('error');
        }
    },
);
