import { Suspense, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserIsInitedAuthData, userActions } from 'entities/User';
import { useTheme } from './providers/ThemeProvider';
import { AppRouter } from './providers/router';

const App = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const inited = useSelector(getUserIsInitedAuthData);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', [])}>
            {/* Глобальное оборачивание компонентов, т.к. переводы будут подгружаться асинхронно */}
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    {/* AppRouter рендерится раньше, чем инициализируются данные о пользователе, необходима проверка */}
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
};

export default App;
