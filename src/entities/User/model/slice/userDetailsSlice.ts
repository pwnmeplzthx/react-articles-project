import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserDetailsCardSchema } from '@/entities/User';
import { fetchUserData } from '../services/fetchUserData';
import { updateUserData } from '../services/updateUserData';

const initialState: UserDetailsCardSchema = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
        },
        cancelEdit: (state) => {
            state.readonly = true;
            state.validateErrors = undefined;
            state.form = state.data;
        },
        updateUser: (state, action: PayloadAction<User>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchUserData.fulfilled, (
                state,
                action: PayloadAction<User>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateUserData.pending, (state) => {
                state.validateErrors = undefined;
                state.isLoading = true;
            })
            .addCase(updateUserData.fulfilled, (
                state,
                action: PayloadAction<User>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
                state.readonly = true;
                state.validateErrors = undefined;
            })
            .addCase(updateUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.validateErrors = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: userDetailsActions } = userDetailsSlice;
export const { reducer: userDetailsReducer } = userDetailsSlice;
