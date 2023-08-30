import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createUserData } from '../services/createUserData/createUserData';
import { CreateUserSchema } from '../types/createUserSchema';
import { User } from '@/entities/User';

const initialState: CreateUserSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const createUserSlice = createSlice({
    name: 'createUser',
    initialState,
    reducers: {
        cancelCreate: (state) => {
            state.validateErrors = undefined;
        },
        createUser: (state, action: PayloadAction<User>) => {
            state.data = {
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUserData.pending, (state) => {
                state.validateErrors = undefined;
                state.isLoading = true;
            })
            .addCase(createUserData.fulfilled, (
                state,
                action: PayloadAction<User>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
                state.validateErrors = undefined;
            })
            .addCase(createUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.validateErrors = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: createUserActions } = createUserSlice;
export const { reducer: createUserReducer } = createUserSlice;
