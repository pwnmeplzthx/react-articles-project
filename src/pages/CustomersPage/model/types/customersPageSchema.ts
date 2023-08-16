import { EntityState } from '@reduxjs/toolkit';
import { SortOrder } from '@/shared/types/sort';
import { Customer, CustomerSortField, CustomerView } from '@/entities/Customer';

export interface CustomersPageSchema extends EntityState<Customer> {
    isLoading?: boolean;
    error?: string;

    // Тип отображения: плитка или блок
    view: CustomerView;
    // pagination
    page: number;
    limit: number;
    hasMore: boolean;
    // filters
    order: SortOrder;
    sort: CustomerSortField;
    search: string;

    _inited?: boolean;
}
