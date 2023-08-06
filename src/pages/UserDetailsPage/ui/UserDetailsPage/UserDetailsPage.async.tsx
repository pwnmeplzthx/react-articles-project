import { lazy } from 'react';

export const UserDetailsPageAsync = lazy(() => import('./UserDetailsPage'));

// Сделано для проверки (задержка загрузки на 1,5 сек)
// export const ArticleDetailsPageAsync = lazy(() => new Promise((resolve) => {
//     // @ts-ignore
//     setTimeout(() => { resolve(import('./ArticleDetailsPage')); }, 1500);
// }));
