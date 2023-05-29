import { FC, lazy } from 'react';
import { LoginFormProps } from './LoginForm';

//  export const LoginFormAsync = lazy(() => import('./LoginForm'))

// Из-за использования memo в компоненте теряются пропсы, фикс: тип <FC<LoginFormProps>>
export const LoginFormAsync = lazy <FC<LoginFormProps>>(() => new Promise((resolve) => {
    // @ts-ignore
    // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
    setTimeout(() => resolve(import('./LoginForm')), 1500);
}));
