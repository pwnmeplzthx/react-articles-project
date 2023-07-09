import {
    Suspense, memo, useCallback,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutesProps, routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader/PageLoader';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { RequireAuth } from './RequireAuth';

const AppRouter = () => {
    const userAuthData = !!(useSelector(getUserAuthData));

    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            // Оборачиваем для lazy-load (подгрузки страниц чанками)
            <Suspense fallback={<PageLoader />}>
                {route.element}
            </Suspense>
        );
        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth roles={route.roles}>{element}</RequireAuth> : element}
            />
        );
    }, []);

    let routeConfigItems = Object.values(routeConfig);

    if (userAuthData) {
        routeConfigItems = routeConfigItems.filter((element) => element.path !== '/auth');
    }

    return (
        <Routes>
            {routeConfigItems.map(renderWithWrapper)}
        </Routes>
    );
};

export default memo(AppRouter);
