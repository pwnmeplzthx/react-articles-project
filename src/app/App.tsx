import { Suspense, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, getUserIsInitedAuthData, userActions } from 'entities/User';
import { AuthPage } from 'pages/AuthPage';
import { useTheme } from './providers/ThemeProvider';
import { AppRouter } from './providers/router';

const App = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const inited = useSelector(getUserIsInitedAuthData);
    const userAuthData = !!(useSelector(getUserAuthData));

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', [])}>
            {/* Глобальное оборачивание компонентов, т.к. переводы будут подгружаться асинхронно */}
            <Suspense fallback="">
                {userAuthData
                    ? (
                        <>
                            <Sidebar className="sidebar" />
                            <div className="content-page">
                                <Navbar />
                                {/* AppRouter рендерится раньше, чем инициализируются данные о пользователе, необходима проверка */}
                                {inited && <AppRouter />}
                            </div>
                        </>
                    )
                    : <AuthPage />}
            </Suspense>
        </div>
    );
};

export default App;
