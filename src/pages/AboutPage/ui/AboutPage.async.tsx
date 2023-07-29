import { lazy } from 'react';

export const AboutPageAsync = lazy(() => import('./AboutPage'));

// Сделано для проверки (задержка загрузки на 1,5 сек)
// export const AboutPageAsync = lazy(() => new Promise((resolve) => {
//     // @ts-ignore
//     setTimeout(() => { resolve(import('./AboutPage')); }, 1500);
// }));
