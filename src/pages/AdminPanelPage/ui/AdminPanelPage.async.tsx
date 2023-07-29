import { lazy } from 'react';

export const AdminPanelPageAsync = lazy(() => import('./AdminPanelPage'));

// Сделано для проверки (задержка загрузки на 1,5 сек)
// export const AdminPanelPageAsync = lazy(() => new Promise((resolve) => {
//     // @ts-ignore
//     setTimeout(() => { resolve(import('./AdminPanelPage')); }, 1500);
// }));
