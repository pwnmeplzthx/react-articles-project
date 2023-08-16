import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';

// TODO delete this
import MainIconDeprecated from '@/shared/assets/icons/main-20-20.svg';
import AboutIconDeprecated from '@/shared/assets/icons/about-20-20.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile-20-20.svg';
import ArticleIconDeprecated from '@/shared/assets/icons/article-20-20.svg';

import MainIcon from '@/shared/assets/icons/home.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import CustomerIcon from '@/shared/assets/icons/clients-20x20.svg';

import { SidebarItemType } from '../types/sidebar';
import {
    getRouteArticles, getRouteCustomers, getRouteMain, getRouteUsers,
} from '@/app/providers/router/config/routeConfig';

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
                    path: getRouteUsers(),
                    Icon: ProfileIcon,
                    text: 'Users',
                    authOnly: true,
                },
                {
                    path: getRouteCustomers(),
                    Icon: CustomerIcon,
                    text: 'Customers',
                    authOnly: true,
                },
                // {
                //     path: getRouteArticles(),
                //     Icon: ArticleIcon,
                //     text: 'Articles',
                //     authOnly: true,
                // },
            );
        }

        return sidebarItemsList;
    },
);
