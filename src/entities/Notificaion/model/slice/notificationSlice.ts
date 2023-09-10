import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { Notification } from '../types/Notification';

const initialState: Notification = {
    message: '',
    type: 'success',
};

export const notificationSlice = buildSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action: PayloadAction<Notification>) => ({
            message: action.payload.message,
            type: action.payload.type,
        }),
    },
});

// Action creators are generated for each case reducer function
export const {
    actions: notificationActions,
    reducer: notificationReducer,
    useActions: useNotificationActions,
} = notificationSlice;
