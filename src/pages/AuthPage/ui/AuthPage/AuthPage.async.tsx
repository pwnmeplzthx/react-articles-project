import { lazy } from 'react';

export const AuthPageAsync = lazy(() => import('./AuthPage'));

// Сделано для проверки (задержка загрузки на 1,5 сек)
// export const AuthPageAsync = lazy(() => new Promise((resolve) => {
//     // @ts-ignore
//     setTimeout(() => { resolve(import('./AuthPage')); }, 1500);
// }));
