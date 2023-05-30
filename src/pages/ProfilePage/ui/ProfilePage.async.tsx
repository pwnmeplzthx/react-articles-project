import { lazy } from 'react';

//  export const ProfilePageAsync = lazy(() => import('./ProfilePage'))

// Сделано для проверки (задержка загрузки на 1,5 сек)
export const ProfilePageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./ProfilePage')), 1500);
}));
