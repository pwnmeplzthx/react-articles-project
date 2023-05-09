import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';

const AppRouter = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            {Object.values(routeConfig).map((routeItem) => (
                <Route
                    key={routeItem.path}
                    path={routeItem.path}
                    element={(
                        // Оборачиваем контентную часть, чтобы растянуть ее на остаток (от aside) страницы
                        // навешиваем на класс page-wrapper: flex-grow (см index.scss)
                        <div className="page-wrapper">
                            {routeItem.element}
                        </div>
                    )}
                />
            ))}
        </Routes>
    </Suspense>
);

export default AppRouter;
