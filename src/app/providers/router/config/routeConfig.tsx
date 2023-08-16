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
import { UsersPage } from '@/pages/UsersPage';
import { UserDetailsPage } from '@/pages/UserDetailsPage';
import { CustomersPage } from '@/pages/CustomersPage';
import { CustomerDetailsPage } from '@/pages/CustomerDetailsPage';

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
    USERS = 'users',
    USER_DETAILS = 'user_details',
    CUSTOMERS = 'customers',
    CUSTOMERS_DETAILS = 'customer_details',
    ADMIN_PANEL = 'admin_panel',
    FORBIDDEN = 'forbidden',
    // last
    NOT_FOUND = 'not_found',

}

export const getRouteAuth = () => '/auth';
export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticles = () => '/articles';
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteUsers = () => '/users';
export const getRouteUserDetails = (id: string) => `/users/${id}`;
export const getRouteCustomers = () => '/customers';
export const getRouteCustomerDetails = (id: string) => `/customers/${id}`;
export const getRouteArticleCreate = () => '/articles/new';
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteAdmin = () => '/admin';
export const getRouteForbidden = () => '/forbidden';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.AUTH]: {
        path: getRouteAuth(),
        element: <AuthPage />,
    },
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
        authOnly: true,
    },
    [AppRoutes.PROFILE]: {
        path: getRouteProfile(':id'),
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLES]: {
        path: getRouteArticles(),
        element: <ArticlesPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_DETAILS]: {
        path: getRouteArticleDetails(':id'),
        element: <ArticleDetailsPage />,
        authOnly: true,
    },
    [AppRoutes.USERS]: {
        path: getRouteUsers(),
        element: <UsersPage />,
        authOnly: true,
    },
    [AppRoutes.USER_DETAILS]: {
        path: getRouteUserDetails(':id'),
        element: <UserDetailsPage />,
        authOnly: true,
    },
    [AppRoutes.CUSTOMERS]: {
        path: getRouteCustomers(),
        element: <CustomersPage />,
        authOnly: true,
    },
    [AppRoutes.CUSTOMERS_DETAILS]: {
        path: getRouteCustomerDetails(':id'),
        element: <CustomerDetailsPage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: getRouteAdmin(),
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRole.ADMIN],
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
        authOnly: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
};

// Используется в useRouteChange хуке
export const AppRouteByPathPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getRouteProfile(':id')]: AppRoutes.PROFILE,
    [getRouteArticles()]: AppRoutes.ARTICLES,
    [getRouteArticleDetails(':id')]: AppRoutes.ARTICLE_DETAILS,
    [getRouteAdmin()]: AppRoutes.ADMIN_PANEL,
    [getRouteForbidden()]: AppRoutes.FORBIDDEN,
    [getRouteUsers()]: AppRoutes.USERS,
    [getRouteUserDetails(':id')]: AppRoutes.USER_DETAILS,
    [getRouteCustomers()]: AppRoutes.CUSTOMERS,
    [getRouteCustomerDetails(':id')]: AppRoutes.CUSTOMERS_DETAILS,
};
