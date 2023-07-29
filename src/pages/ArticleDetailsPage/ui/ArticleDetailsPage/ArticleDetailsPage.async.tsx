import { lazy } from 'react';

export const ArticleDetailsPageAsync = lazy(() => import('./ArticleDetailsPage'));

// Сделано для проверки (задержка загрузки на 1,5 сек)
// export const ArticleDetailsPageAsync = lazy(() => new Promise((resolve) => {
//     // @ts-ignore
//     setTimeout(() => { resolve(import('./ArticleDetailsPage')); }, 1500);
// }));
