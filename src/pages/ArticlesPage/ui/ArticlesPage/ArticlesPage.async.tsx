import { lazy } from 'react';

export const ArticlesPageAsync = lazy(() => import('./ArticlesPage'));

// Сделано для проверки (задержка загрузки на 1,5 сек)
// export const ArticlesPageAsync = lazy(() => new Promise((resolve) => {
//     // @ts-ignore
//     setTimeout(() => { resolve(import('./ArticlesPage')); }, 1500);
// }));
