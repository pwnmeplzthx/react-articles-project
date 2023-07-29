import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import ArticleIcon from '@/shared/assets/icons/article-20-20.svg';
import MainIcon from '@/shared/assets/icons/main-20-20.svg';
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg';
import { SidebarItemType } from '../types/sidebar';
import { getRouteArticles, getRouteMain, getRouteProfile } from '@/app/providers/router/config/routeConfig';

// используется createSelector (реселект), чтобы мемоизировать значения
export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: getRouteMain(),
                Icon: MainIcon,
                text: 'Main',
            },
        ];

        if (userData) {
            sidebarItemsList.push(
                {
                    path: getRouteProfile(userData.id),
                    Icon: ProfileIcon,
                    text: 'Profile',
                    authOnly: true,
                },
                {
                    path: getRouteArticles(),
                    Icon: ArticleIcon,
                    text: 'Articles',
                    authOnly: true,
                },
            );
        }

        return sidebarItemsList;
    },
);
