import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData, getUserIsInitedAuthData, userActions } from '@/entities/User';
import { AuthPage } from '@/pages/AuthPage';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { useAppToolbar } from './lib/useAppToolbar';
import { useTheme } from './providers/ThemeProvider';
import { AppRouter } from './providers/router';
import { NotificationItem, getNotificationData } from '@/entities/Notificaion';

const App = () => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserIsInitedAuthData);
    const userAuthData = !!(useSelector(getUserAuthData));
    const toolbar = useAppToolbar();
    const { message, type } = useSelector(getNotificationData);

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
                        <>
                            <MainLayout
                                header={<Navbar />}
                                content={<AppRouter />}
                                sidebar={<Sidebar />}
                                toolbar={toolbar}
                            />
                            {message && <NotificationItem message={message} type={type} />}
                        </>

                    )
                    : <AuthPage />}
            </Suspense>
        </div>
    );
};

export default App;
