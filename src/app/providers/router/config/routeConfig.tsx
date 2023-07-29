import { RouteProps } from 'react-router-dom';
import { UserRole } from '@/entities/User';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { AuthPage } from '@/pages/AuthPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';

// Расширяем пропсы библиотеки
export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRole[];
}

export enum AppRoutes {
    AUTH = 'auth',
    MAIN = 'main',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ADMIN_PANEL = 'admin_panel',
    FORBIDDEN = 'forbidden',
    // last
    NOT_FOUND = 'not_found',

}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.AUTH]: '/auth',
    [AppRoutes.MAIN]: '/',
    [AppRoutes.PROFILE]: '/profile/', // + :id
    [AppRoutes.ARTICLES]: '/articles',
    [AppRoutes.ARTICLE_DETAILS]: '/articles/', // + :id
    [AppRoutes.ADMIN_PANEL]: '/admin',
    [AppRoutes.FORBIDDEN]: '/forbidden',
    // Должен быть посденим, и срабатывать, если ни 1 из маршрутов не отработал
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.AUTH]: {
        path: RoutePath.auth,
        element: <AuthPage />,
    },
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
        authOnly: true,
    },
    [AppRoutes.PROFILE]: {
        path: `${RoutePath.profile}:id`,
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLES]: {
        path: RoutePath.articles,
        element: <ArticlesPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_DETAILS]: {
        path: `${RoutePath.article_details}:id`,
        element: <ArticleDetailsPage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: `${RoutePath.admin_panel}`,
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRole.ADMIN],
    },
    [AppRoutes.FORBIDDEN]: {
        path: `${RoutePath.forbidden}`,
        element: <ForbiddenPage />,
        authOnly: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
