import { getUserAuthData } from 'entities/User';
import { Suspense, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader/PageLoader';

const AppRouter = () => {
    const isAuth = useSelector(getUserAuthData);

    const routes = useMemo(() => Object.values(routeConfig).filter((route) => {
        if (route.authOnly && !isAuth) {
            return false;
        }

        return true;
    }), [isAuth]);

    return (
        <Routes>
            {routes.map((routeItem) => (
                <Route
                    key={routeItem.path}
                    path={routeItem.path}
                    element={(
                        // Оборачиваем для lazy-load (подгрузки страниц чанками)
                        <Suspense fallback={<PageLoader />}>
                            {/* // Оборачиваем контентную часть, чтобы растянуть ее на остаток (от aside) страницы
                            // навешиваем на класс page-wrapper: flex-grow (см index.scss) */}
                            <div className="page-wrapper">
                                {routeItem.element}
                            </div>
                        </Suspense>
                    )}
                />
            ))}
        </Routes>
    );
};

export default memo(AppRouter);
