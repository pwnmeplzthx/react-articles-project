import {
    AnyAction, CombinedState, Dispatch, ThunkDispatch,
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { ThunkExtraArg } from '@/app/providers/StoreProvider/config/StateSchema';
import { NotificationType } from '../../ui/NotificationItem';
import { notificationActions } from '../slice/notificationSlice';

export const showNotification = (type: NotificationType, notificationMessage: string, dispatch: ThunkDispatch<CombinedState<StateSchema>, ThunkExtraArg, AnyAction> & Dispatch<AnyAction>) => {
    dispatch(notificationActions.setNotification({ message: notificationMessage, type }));
};
