import { EntityState } from '@reduxjs/toolkit';
import { SortOrder } from '@/shared/types/sort';
import { UserSortField, UserView } from '@/entities/User/model/consts/consts';
import { User } from '@/entities/User';

export interface UsersPageSchema extends EntityState<User> {
    isLoading?: boolean;
    error?: string;

    // Тип отображения: плитка или блок
    view: UserView;
    // pagination
    page: number;
    limit: number;
    hasMore: boolean;
    // filters
    order: SortOrder;
    sort: UserSortField;
    search: string;

    _inited?: boolean;
}
