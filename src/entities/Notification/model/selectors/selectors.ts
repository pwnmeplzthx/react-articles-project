import { StateSchema } from '@/app/providers/StoreProvider';

export const getNotificationData = (state: StateSchema) => state.notification;
