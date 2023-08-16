import { ReactElement } from 'react';
import { ScrollToolbar } from '@/widgets/ScrollToolbar';
import { AppRoutes } from '../providers/router/config/routeConfig';
import { useRouteChange } from '@/shared/lib/router/useRouteChange';

export function useAppToolbar() {
    const appRoute = useRouteChange();

    const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
        [AppRoutes.ARTICLES]: <ScrollToolbar />,
        [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
        [AppRoutes.USERS]: <ScrollToolbar />,
        [AppRoutes.USER_DETAILS]: <ScrollToolbar />,
        [AppRoutes.CUSTOMERS]: <ScrollToolbar />,
        [AppRoutes.PROFILE]: <ScrollToolbar />,
    };

    return toolbarByAppRoute[appRoute];
}
