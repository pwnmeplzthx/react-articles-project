import { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserAuthData, getUserIsInitedAuthData, userActions } from '@/entities/User';
import { AuthPage } from '@/pages/AuthPage';
import { useTheme } from './providers/ThemeProvider';
import { AppRouter } from './providers/router';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { useAppToolbar } from './lib/useAppToolbar';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';

const App = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const inited = useSelector(getUserIsInitedAuthData);
    const userAuthData = !!(useSelector(getUserAuthData));
    const toolbar = useAppToolbar();

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    // Скелетон - лейаут, отображается до подгрузки данных пользователя
    if (!inited) {
        return (
            <div
                id="app"
                className={classNames('app_redesigned', [theme])}
            >
                <AppLoaderLayout />
                {' '}
            </div>
        );
    }

    return (
        <div id="app" className={classNames('app_redesigned', [])}>
            {/* Глобальное оборачивание компонентов, т.к. переводы будут подгружаться асинхронно */}
            <Suspense fallback="">
                {userAuthData
                    ? (
                        <MainLayout
                            header={<Navbar />}
                            content={<AppRouter />}
                            sidebar={<Sidebar />}
                            toolbar={toolbar}
                        />
                    )
                    : <AuthPage />}
            </Suspense>
        </div>
    );
};

export default App;
