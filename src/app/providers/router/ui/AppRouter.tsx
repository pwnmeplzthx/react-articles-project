import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader/PageLoader';

const AppRouter = () => (
    <Routes>
        {Object.values(routeConfig).map((routeItem) => (
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

export default AppRouter;
