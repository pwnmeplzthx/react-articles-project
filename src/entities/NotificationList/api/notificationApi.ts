import { rtkApi } from '@/shared/api/rtkApi';
import { NotificationList } from '../model/types/notificationList';

const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<NotificationList[], null>({
            query: () => ({
                url: '/notifications',
            }),
        }),
    }),
});

export const useNotifications = notificationApi.useGetNotificationsQuery;
