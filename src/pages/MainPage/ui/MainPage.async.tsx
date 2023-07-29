import { lazy } from 'react';

export const MainPageAsync = lazy(() => import('./MainPage'));

// Сделано для проверки (задержка загрузки на 1,5 сек)
// export const MainPageAsync = lazy(() => new Promise((resolve) => {
//     // @ts-ignore
//     setTimeout(() => { resolve(import('./MainPage')); }, 1500);
// }));
